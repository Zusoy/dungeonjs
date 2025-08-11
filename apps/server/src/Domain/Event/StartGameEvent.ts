import type { IGameEvent } from 'Domain/GameEvent'

export class StartGameEvent implements IGameEvent {
  public readonly tag = 'start_game'
  constructor(public readonly roomId: string) {}
}
