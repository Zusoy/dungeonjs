import type { ScalarCoords } from 'types/coords'
import type { Loot } from 'types/loot'

export enum SkeletonType {
  Mage = 'mage',
  Minion = 'minion',
  Rogue = 'rogue',
  Warrior = 'warrior',
  Golem = 'golem'
}

export interface Skeleton {
  readonly id: string
  readonly type: SkeletonType
  readonly defense: number
  readonly coords: ScalarCoords
  readonly loot: Loot
}
