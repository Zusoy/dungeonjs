import type { WorldLoot } from 'Domain/Model/Loot'

export type LootEvent = {
  readonly lootId: WorldLoot['id']
}
