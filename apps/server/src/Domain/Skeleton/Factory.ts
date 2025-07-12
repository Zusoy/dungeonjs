import { injectable } from 'tsyringe'
import type { ScalarCoords } from 'Domain/Geometry/Coords'
import type { Loot } from 'Domain/Model/Loot'
import { MageSkeleton, MinionSkeleton, RogueSkeleton, type Skeleton, SkeletonType, WarriorSkeleton } from 'Domain/Model/Skeleton'

@injectable()
export class Factory {
  build(type: SkeletonType, id: string, coords: ScalarCoords, loot: Loot): Skeleton {
    switch (type) {
      case SkeletonType.Minion:
        return new MinionSkeleton(id, coords, loot)

      case SkeletonType.Mage:
        return new MageSkeleton(id, coords, loot)

      case SkeletonType.Rogue:
        return new RogueSkeleton(id, coords, loot)

      case SkeletonType.Warrior:
        return new WarriorSkeleton(id, coords, loot)
    }
  }
}
