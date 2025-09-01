import { IGameEvent } from 'Domain/GameEvent'

export class NewGameEvent implements IGameEvent {
  public readonly tag = 'new_game'
  constructor(public readonly timestamp: number) {}
}
