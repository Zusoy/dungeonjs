import type { IGameEvent } from 'Domain/GameEvent'

export class EndTurnEvent implements IGameEvent {
  public readonly tag = 'end_turn'
  constructor(public readonly timestamp: number) {}
}
