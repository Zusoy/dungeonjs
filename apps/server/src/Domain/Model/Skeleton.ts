import { z } from 'zod'
import { ScalarCoordsSchema, type ScalarCoords } from 'Domain/Geometry/Coords'
import { LootSchema, type Loot } from 'Domain/Model/Loot'

export const SkeletonTypeSchema = z.literal(['mage', 'minion', 'rogue', 'warrior', 'golem'])
export type SkeletonType = z.infer<typeof SkeletonTypeSchema>

export const SkeletonSchema = z.object({
  id: z.string().nonempty(),
  type: SkeletonTypeSchema,
  defense: z.number(),
  coords: ScalarCoordsSchema,
  loot: LootSchema
})

export class MinionSkeleton {
  public readonly type: SkeletonType = 'minion' as const
  public readonly defense: number = 5

  constructor(
    public readonly id: string,
    public readonly coords: ScalarCoords,
    public readonly loot: Loot
  ) { }
}

export class RogueSkeleton {
  public readonly type: SkeletonType = 'rogue' as const
  public readonly defense: number = 6

  constructor(
    public readonly id: string,
    public readonly coords: ScalarCoords,
    public readonly loot: Loot
  ) { }
}

export class MageSkeleton {
  public readonly type: SkeletonType = 'mage' as const
  public readonly defense: number = 7

  constructor(
    public readonly id: string,
    public readonly coords: ScalarCoords,
    public readonly loot: Loot
  ) { }
}

export class WarriorSkeleton {
  public readonly type: SkeletonType = 'warrior' as const
  public readonly defense: number = 8

  constructor(
    public readonly id: string,
    public readonly coords: ScalarCoords,
    public readonly loot: Loot
  ) { }
}

export class Golem {
  public readonly type: SkeletonType = 'golem' as const
  public readonly defense: number = 15

  constructor(
    public readonly id: string,
    public readonly coords: ScalarCoords,
    public readonly loot: Loot
  ) {}
}

export type Skeleton = z.infer<typeof SkeletonSchema>
