import type { PlayerPayload } from 'Domain/Model/Player'

export type PlayersEvent = {
  readonly players: Iterable<PlayerPayload>
}
