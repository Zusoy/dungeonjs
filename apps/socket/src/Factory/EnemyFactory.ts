import { injectable } from 'tsyringe'
import type { ScalarCoords } from 'types/coords'
import { MageSkeleton, MinionSkeleton, RogueSkeleton, type Skeleton, SkeletonType, WarriorSkeleton } from 'types/enemy'

@injectable()
export default class EnemyFactory {
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
