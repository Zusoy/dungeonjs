import { inject, injectable } from 'tsyringe'
import type IServer from 'IServer'
import type Room from 'Netcode/Room'
import type User from 'Netcode/User'
import type ILogger from 'ILogger'
import type ICollection from 'Netcode/Collection/ICollection'

@injectable()
export default class UserEmitter {
  constructor(
    @inject('server') private readonly server: IServer,
    @inject('users') private readonly users: ICollection<User>,
    @inject('logger') private readonly logger: ILogger
  ) { }

  /**
   * Broadcast users collection within room
   */
  public broadcast(room: Room): void {
    this.server.fetchSocketIds(room)
      .then(ids => {
        const players = Array.from(ids)
          .map(id => this.users.find(id))
          .filter(u => !!u)
          .map(u => u.getRoomPayload(u.id === room.createdById))

        this.server.emitInRoom('players', room, players)
      })
  }

  public broadcastNextTurn(room: Room, currentPlayerId: string): void {
    this.server.fetchSocketIds(room)
      .then(ids => {
        const playerIds = Array.from(ids)
        const user = this.users.find(currentPlayerId)
        const index = playerIds.findIndex(id => id === currentPlayerId)

        if (index < 0 || !user) {
          this.logger.error(`Player socket id not found: ${currentPlayerId}`)
          return
        }

        user.movesCount = 4
        this.users.update(user, index)
        this.broadcast(room)

        const nextPlayerIndex = index === playerIds.length - 1 ? 0 : index + 1
        const nextPlayer = this.users.find(playerIds[nextPlayerIndex])

        if (!nextPlayer) {
          return
        }

        if (nextPlayer.health <= 0) {
          nextPlayer.health = 1
          this.users.update(nextPlayer, nextPlayerIndex)
          this.broadcast(room)
          this.broadcastNextTurn(room, nextPlayer.id)
          return
        }

        this.server.emitInRoom('playerTurn', room, playerIds[nextPlayerIndex])
      })
  }
}
