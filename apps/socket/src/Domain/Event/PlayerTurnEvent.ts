import type { PlayerPayload } from 'Domain/Model/Player'

export type PlayerTurnEvent = {
  readonly playerId: PlayerPayload['id']
}
