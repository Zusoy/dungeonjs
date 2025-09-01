import type { IGameEvent } from 'Domain/GameEvent'
import type { WorldLoot } from 'Domain/Model/Loot'

export class LootsEvent implements IGameEvent {
  public readonly tag = 'loots'
  constructor(public readonly loots: Iterable<WorldLoot>) {}
}
