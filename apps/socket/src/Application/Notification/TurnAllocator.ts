import { inject, injectable } from 'tsyringe'
import type { ITurnAllocator } from 'Domain/Notification/ITurnAllocator'
import type { PlayerPayload } from 'Domain/Model/Player'
import type { Room } from 'Domain/Model/Room'
import type { IServer } from 'Domain/IServer'
import type { IPlayers } from 'Domain/Repository/IPlayers'
import type { ILogger } from 'Domain/ILogger'
import type { IPlayerBroadcaster } from 'Domain/Notification/IPlayerBroadcaster'

@injectable()
export class TurnAllocator implements ITurnAllocator {
  constructor(
    @inject('server')
    private readonly server: IServer,
    @inject('players')
    private readonly players: IPlayers,
    @inject('players.broadcaster')
    private readonly broadcaster: IPlayerBroadcaster,
    @inject('logger')
    private readonly logger: ILogger
  ) { }

  allocateNextTurn(room: Room, currentPlayerId: PlayerPayload['id']): void {
    this.server.fetchSocketIds(room)
      .then(ids => {
        const playerIds = Array.from(ids)
        const user = this.players.find(currentPlayerId)
        const index = playerIds.findIndex(id => id === currentPlayerId)

        if (index < 0 || !user) {
          this.logger.error(`Player socket id not found: ${currentPlayerId}`)
          return
        }

        user.movesCount = 4
        this.players.update(user, index)
        this.broadcaster.broadcast(room)

        const nextPlayerIndex = index === playerIds.length - 1 ? 0 : index + 1
        const nextPlayer = this.players.find(playerIds[nextPlayerIndex])

        if (!nextPlayer) {
          return
        }

        if (nextPlayer.health <= 0) {
          nextPlayer.health = 1
          this.players.update(nextPlayer, nextPlayerIndex)
          this.broadcaster.broadcast(room)
          this.allocateNextTurn(room, nextPlayer.id)
          return
        }

        this.server.emitInRoom('playerTurn', room, { playerId: playerIds[nextPlayerIndex] })
      })
  }
}
