import { inject, injectable } from 'tsyringe'
import type { AppServer } from 'types/socket'
import type Room from 'Netcode/Room'
import type User from 'Netcode/User'
import type ILogger from 'ILogger'
import type ICollection from 'Netcode/Collection/ICollection'

@injectable()
export default class UserEmitter {
  constructor(
    @inject('server') private readonly server: AppServer,
    @inject('users') private readonly users: ICollection<User>,
    @inject('logger') private readonly logger: ILogger
  ) {}

  /**
   * Broadcast users collection within room
   */
  public broadcast(room: Room): void {
    this.server.in(room.roomId).fetchSockets()
      .then(sockets => {
        const players = sockets
          .map(({ id }) => id)
          .map(id => this.users.find(id))
          .filter(u => !!u)
          .map(u => u.getRoomPayload(u.id === room.createdById))

        this.server.in(room.roomId).emit('players', players)
      })
  }

  public broadcastNextTurn(room: Room, currentPlayerId: string): void {
    this.server.in(room.roomId).fetchSockets()
      .then(sockets => {
        const ids = sockets.map(({ id }) => id)
        const user = this.users.find(currentPlayerId)
        const index = ids.findIndex(id => id === currentPlayerId)

        if (index < 0 || !user) {
          this.logger.error(`Player socket id not found: ${currentPlayerId}`)
          return
        }

        user.movesCount = 4
        this.users.update(user, index)
        this.broadcast(room)

        const newPlayerIndex = index === ids.length - 1 ? 0 : index + 1
        this.server.in(room.roomId).emit('playerTurn', ids[newPlayerIndex])
      })
  }
}
