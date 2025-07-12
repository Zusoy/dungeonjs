import type { Player, PlayerPayload } from 'Domain/Model/Player'
import type { Nullable } from 'utils'

export interface IPlayers extends Iterable<Player> {
  add(player: Player): void
  remove(player: Player): void
  update(player: Player): void
  find(playerId: PlayerPayload['id']): Nullable<Player>
}
