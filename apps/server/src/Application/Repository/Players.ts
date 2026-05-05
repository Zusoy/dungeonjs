import { injectable, type Disposable as IDisposable } from 'tsyringe'
import type { Player, PlayerPayload } from 'Domain/Model/Player'
import type { IPlayers as IPlayerRepository } from 'Domain/Repository/IPlayers'
import type { Nullable } from 'utils'

@injectable()
export class Players implements IPlayerRepository, IDisposable {
  private players: Player[] = []

  async add(player: Player): Promise<void> {
    this.players = [...this.players, player]
  }

  async remove(player: Player): Promise<void> {
    this.players = this.players.filter(p => p.id !== player.id)
  }

  async update(item: Player): Promise<void> {
    const index = this.players.findIndex(player => player.id === item.id)
    this.players = this.players.map((player, i) => i === index ? item : player)
  }

  find(playerId: PlayerPayload['id']): Promise<Nullable<Player>> {
    return Promise.resolve(this.players.find(p => p.id === playerId) || null)
  }

  dispose(): Promise<void> | void {
    this.players = []
  }
}
