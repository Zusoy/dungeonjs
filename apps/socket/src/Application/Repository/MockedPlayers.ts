import type { Player, PlayerPayload } from 'Domain/Model/Player'
import type { IPlayers } from 'Domain/Repository/IPlayers'
import type { Nullable } from 'utils'

export class MockedPlayers implements IPlayers {
  constructor(private players: Player[] = []) { }

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

  clean(): void {
    this.players = []
  }

  *[Symbol.iterator](): IterableIterator<Player> {
    for (const player of this.players) {
      yield player
    }
  }
}
