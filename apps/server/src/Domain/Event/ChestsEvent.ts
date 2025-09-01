import type { Chest } from 'Domain/Model/Chest'
import type { IGameEvent } from 'Domain/GameEvent'

export class ChestsEvent implements IGameEvent {
  public readonly tag = 'chests'
  constructor(public readonly chests: Iterable<Chest>) {}
}
