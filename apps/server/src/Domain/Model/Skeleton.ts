import type { ScalarCoords } from 'Domain/Geometry/Coords'
import type { Loot } from 'Domain/Model/Loot'

export enum SkeletonType {
  Mage = 'mage',
  Minion = 'minion',
  Rogue = 'rogue',
  Warrior = 'warrior'
}

export interface Skeleton {
  readonly id: string
  readonly type: SkeletonType
  readonly defense: number
  readonly coords: ScalarCoords
  readonly loot: Loot
}

export class MinionSkeleton implements Skeleton {
  public readonly type: SkeletonType = SkeletonType.Minion
  public readonly defense: number = 5

  constructor(
    public readonly id: string,
    public readonly coords: ScalarCoords,
    public readonly loot: Loot
  ) { }
}

export class RogueSkeleton implements Skeleton {
  public readonly type: SkeletonType = SkeletonType.Rogue
  public readonly defense: number = 6

  constructor(
    public readonly id: string,
    public readonly coords: ScalarCoords,
    public readonly loot: Loot
  ) { }
}

export class MageSkeleton implements Skeleton {
  public readonly type: SkeletonType = SkeletonType.Mage
  public readonly defense: number = 7

  constructor(
    public readonly id: string,
    public readonly coords: ScalarCoords,
    public readonly loot: Loot
  ) { }
}

export class WarriorSkeleton implements Skeleton {
  public readonly type: SkeletonType = SkeletonType.Warrior
  public readonly defense: number = 8

  constructor(
    public readonly id: string,
    public readonly coords: ScalarCoords,
    public readonly loot: Loot
  ) { }
}
