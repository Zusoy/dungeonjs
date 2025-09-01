import type { IGameEvent } from 'Domain/GameEvent'
import type { PlayerPayload } from 'Domain/Model/Player'

export class GameEndedEvent implements IGameEvent {
  public readonly tag = 'game_ended'

  constructor(
    public readonly timestamp: number,
    public readonly combatPlayerId: PlayerPayload['id'],
    public readonly winnerPlayerId: PlayerPayload['id']
  ) {}
}
