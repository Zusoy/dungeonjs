import type { IGameEvent } from 'Domain/GameEvent'

export class GameStartedEvent implements IGameEvent {
  public readonly tag = 'game_started'
  constructor(public readonly roomId: string) {}
}
