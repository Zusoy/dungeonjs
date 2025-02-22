import { inject, injectable, registry } from 'tsyringe'
import type IEventHandler from 'IEventHandler'
import type ICollection from 'Netcode/Collection/ICollection'
import type ILogger from 'ILogger'
import { MoveToCoordsPayload, AppSocket, TileType, Direction, ITile, type AppServer } from 'types'
import User, { VectorTuple } from 'Netcode/User'
import Room from 'Netcode/Room'
import UserEmitter from 'Netcode/UserEmitter'

@injectable()
@registry([{ token: 'handlers', useClass: MoveToCoordsHandler }])
export default class MoveToCoordsHandler implements IEventHandler<'moveToCoords'> {
  constructor(
    @inject('users') private readonly users: ICollection<User>,
    @inject('rooms') private readonly rooms: ICollection<Room>,
    @inject('emitter.user') private readonly userEmitter: UserEmitter,
    @inject('server') private readonly server: AppServer,
    @inject('logger') private readonly logger: ILogger
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
      return
    }

    if (movePayload.uncharted) {
      const origin = Direction.opposite(movePayload.fromDirection)
      const randomDirections: VectorTuple[] = Array
        .from({ length: Math.floor(Math.random() * 3) + 1 })
        .map(() => Direction.random())

      const directions = [origin, ...randomDirections]
        .filter((dir, index, arr) => index === arr.findIndex(d => d[0] === dir[0] && d[1] === dir[1] && d[2] === dir[2]))

      const tile: ITile = {
        id: Date.now().toString(),
        type: TileType.Room,
        directions,
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
      this.server.in(room.roomId).fetchSockets()
        .then(sockets => {
          const ids = sockets.map(({ id }) => id)
          const index = ids.findIndex(id => id === socket.id)
          const newPlayerIndex = index === ids.length - 1 ? 0 : index + 1
          this.server.in(room.roomId).emit('playerTurn', ids[newPlayerIndex])
        })
    }
  }
}
