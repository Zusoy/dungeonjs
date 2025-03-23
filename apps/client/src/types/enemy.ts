import type { ScalarCoords } from 'types/coords'

export enum SkeletonType {
  Mage = 'mage',
  Minion = 'minion',
  Rogue = 'rogue',
  Warrior = 'warrior'
}

export interface Skeleton {
  readonly type: SkeletonType
  readonly defense: number
  readonly coords: ScalarCoords
}
