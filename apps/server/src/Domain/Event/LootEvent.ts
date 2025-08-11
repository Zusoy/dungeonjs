import type { IGameEvent } from 'Domain/GameEvent'
import type { WorldLoot } from 'Domain/Model/Loot'

export class LootEvent implements IGameEvent {
  public readonly tag = 'loot'
  constructor(public readonly lootId: WorldLoot['id']) {}
}
