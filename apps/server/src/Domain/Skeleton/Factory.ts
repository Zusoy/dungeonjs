import { injectable } from 'tsyringe'
import type { ScalarCoords } from 'Domain/Geometry/Coords'
import type { Loot } from 'Domain/Model/Loot'
import { Golem, MageSkeleton, MinionSkeleton, RogueSkeleton, type Skeleton, SkeletonType, WarriorSkeleton } from 'Domain/Model/Skeleton'

@injectable()
export class Factory {
  build(type: SkeletonType, id: string, coords: ScalarCoords, loot: Loot): Skeleton {
    switch (type) {
      case 'minion':
        return new MinionSkeleton(id, coords, loot)

      case 'mage':
        return new MageSkeleton(id, coords, loot)

      case 'rogue':
        return new RogueSkeleton(id, coords, loot)

      case 'warrior':
        return new WarriorSkeleton(id, coords, loot)

      case 'golem':
        return new Golem(id, coords, loot)
    }
  }
}
