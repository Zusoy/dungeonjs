import type { Loot } from 'Domain/Model/Loot'

export type LootsEvent = {
  readonly loots: Iterable<Loot>
}
