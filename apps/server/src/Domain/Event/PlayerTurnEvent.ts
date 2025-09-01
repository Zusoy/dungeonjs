import type { IGameEvent } from 'Domain/GameEvent'
import type { PlayerPayload } from 'Domain/Model/Player'

export class PlayerTurnEvent implements IGameEvent {
  public readonly tag = 'player_turn'
  constructor(public readonly playerId: PlayerPayload['id']) {}
}
