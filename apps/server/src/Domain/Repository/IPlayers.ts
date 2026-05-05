import type { Player, PlayerPayload } from 'Domain/Model/Player'
import type { Nullable } from 'utils'

export interface IPlayers {
  add(player: Player): Promise<void>
  remove(player: Player): Promise<void>
  update(player: Player): Promise<void>
  find(playerId: PlayerPayload['id']): Promise<Nullable<Player>>
}
