import { injectable, type Disposable } from 'tsyringe'
import type { Player, PlayerPayload } from 'Domain/Model/Player'
import type { IPlayers as IPlayerRepository } from 'Domain/Repository/IPlayers'
import type { Nullable } from 'utils'

@injectable()
export class Players implements IPlayerRepository, Disposable {
  private players: Player[] = []

  add(player: Player): void {
    this.players = [...this.players, player]
  }

  remove(player: Player): void {
    this.players = this.players.filter(p => p.id !== player.id)
  }

  update(item: Player, index: number): void {
    this.players = this.players.map((player, i) => i === index ? item : player)
  }

  find(playerId: PlayerPayload['id']): Nullable<Player> {
    return this.players.find(p => p.id === playerId) || null
  }

  *[Symbol.iterator](): IterableIterator<Player> {
    for (const player of this.players) {
      yield player
    }
  }

  dispose(): Promise<void> | void {
    this.players = []
  }
}
