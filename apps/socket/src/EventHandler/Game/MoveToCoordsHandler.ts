import { inject, injectable, registry } from 'tsyringe'
import type IEventHandler from 'IEventHandler'
import type ICollection from 'Netcode/Collection/ICollection'
import type ILogger from 'ILogger'
import { MoveToCoordsPayload, AppSocket, TileType, Direction, type Tile, type AppServer, Coords } from 'types'
import User from 'Netcode/User'
import Room from 'Netcode/Room'
import UserEmitter from 'Netcode/UserEmitter'

@injectable()
@registry([{ token: 'handlers', useClass: MoveToCoordsHandler }])
export default class MoveToCoordsHandler implements IEventHandler<'moveToCoords'> {
  constructor(
    @inject('users') private readonly users: ICollection<User>,
    @inject('rooms') private readonly rooms: ICollection<Room>,
    @inject('server') private readonly server: AppServer,
    @inject('logger') private readonly logger: ILogger,
    @inject('emitter.user') private readonly userEmitter: UserEmitter
  ) {
  }

  supports(event: 'moveToCoords', _payload: [payload: MoveToCoordsPayload], _socket: AppSocket): boolean {
    return event === 'moveToCoords'
  }

  handle(_event: 'moveToCoords', payload: [payload: MoveToCoordsPayload], socket: AppSocket): void {
    const [movePayload] = payload
    const roomId = Array.from(socket.rooms).find(room => !!this.rooms.find(room))
    const user = this.users.find(socket.id)
    const userIndex = Array.from(this.users).findIndex(user => user.id === socket.id)

    if (!roomId || !user || userIndex < 0) {
      return
    }

    const room = this.rooms.find(roomId)

    if (!room) {
      this.logger.error(`Room not found with ID ${roomId}`)
      return
    }

    if (movePayload.uncharted) {
      const types = Object.values(TileType)
      const type = movePayload.neighborTiles.length > 1
        ? TileType.Room
        : types[Math.floor(Math.random() * types.length)]

      const corridorDirections = movePayload.fromDirection[0] !== 0
        ? [Direction.Left, Direction.Right]
        : [Direction.Up, Direction.Down]

      const roomDirections = Direction.All
        .filter(dir => {
          const dirCoords: Coords = [movePayload.coords[0] + dir[0], movePayload.coords[1] + dir[2]]
          const adjacentTile = movePayload.neighborTiles.find(({ coords }) => coords[0] === dirCoords[0] && coords[1] === dirCoords[1])

          if (!adjacentTile) {
            return true
          }

          const opposite = Direction.opposite(dir)
          return adjacentTile.directions.some(dir => Direction.equals(opposite, dir))
        })

      const tile: Tile = {
        id: Date.now().toString(),
        type,
        directions: type === TileType.Room ? roomDirections : corridorDirections,
        coords: movePayload.coords
      }

      this.server.in(room.roomId).emit('discoverTile', tile)
      this.logger.info('Discover tile', tile)
    }

    user.position = [
      movePayload.coords[0] * 8,
      user.position[1],
      movePayload.coords[1] * 8
    ]

    user.coords = movePayload.coords
    user.movesCount = Math.max(0, user.movesCount - 1)

    this.users.update(user, userIndex)
    this.userEmitter.broadcast(room)

    if (user.movesCount === 0) {
      this.userEmitter.broadcastNextTurn(room, socket.id)
    }
  }
}
