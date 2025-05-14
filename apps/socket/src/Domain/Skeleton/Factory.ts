import { injectable } from 'tsyringe'
import type { ScalarCoords } from 'Domain/Geometry/Coords'
import { MageSkeleton, MinionSkeleton, RogueSkeleton, type Skeleton, SkeletonType, WarriorSkeleton } from 'Domain/Model/Skeleton'

@injectable()
export class Factory {
  build(type: SkeletonType, id: string, coords: ScalarCoords): Skeleton {
    switch (type) {
      case SkeletonType.Minion:
        return new MinionSkeleton(id, coords)

      case SkeletonType.Mage:
        return new MageSkeleton(id, coords)

      case SkeletonType.Rogue:
        return new RogueSkeleton(id, coords)

      case SkeletonType.Warrior:
        return new WarriorSkeleton(id, coords)
    }
  }
}
