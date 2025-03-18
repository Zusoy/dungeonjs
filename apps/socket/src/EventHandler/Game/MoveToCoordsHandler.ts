import { inject, injectable, registry } from 'tsyringe'
import type IEventHandler from 'IEventHandler'
import type ICollection from 'Netcode/Collection/ICollection'
import type ILogger from 'ILogger'
import type { AppSocket, AppServer } from 'types/socket'
import type { MoveToCoordsPayload } from 'types/payload'
import { TileType } from 'types/tile'
import User from 'Netcode/User'
import Room from 'Netcode/Room'
import UserEmitter from 'Netcode/UserEmitter'
import TileFactory from 'Factory/TileFactory'

@injectable()
@registry([{ token: 'handlers', useClass: MoveToCoordsHandler }])
export default class MoveToCoordsHandler implements IEventHandler<'moveToCoords'> {
  constructor(
    @inject('users') private readonly users: ICollection<User>,
    @inject('rooms') private readonly rooms: ICollection<Room>,
    @inject('server') private readonly server: AppServer,
    @inject('logger') private readonly logger: ILogger,
    @inject('emitter.user') private readonly userEmitter: UserEmitter,
    @inject('tile.factory') private readonly tileFactory: TileFactory
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

      const tile = this.tileFactory.build(
        type,
        {
          id: Date.now().toString(),
          coords: movePayload.coords,
          direction: movePayload.fromDirection,
          adjacentTiles: movePayload.neighborTiles
        }
      )

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
