import type { WorldLoot } from 'Domain/Model/Loot'

export type LootsEvent = {
  readonly loots: Iterable<WorldLoot>
}
