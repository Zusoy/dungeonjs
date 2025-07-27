import React from 'react'
import MageSkeleton from 'features/Game/Dungeon/presentation/GameObject/Character/Skeleton/Mage'
import MinionSkeleton from 'features/Game/Dungeon/presentation/GameObject/Character/Skeleton/Minion'
import RogueSkeleton from 'features/Game/Dungeon/presentation/GameObject/Character/Skeleton/Rogue'
import WarriorSkeleton from 'features/Game/Dungeon/presentation/GameObject/Character/Skeleton/Warrior'
import { Vector3 } from 'three'
import { SkeletonType } from 'types/enemy'

type Props = JSX.IntrinsicElements['group'] & {
  readonly type: SkeletonType
  readonly position: Vector3
}

const Skeleton: React.FC<Props> = props => {
  if (props.type === SkeletonType.Mage) {
    return (
      <MageSkeleton {...props} />
    )
  }

  if (props.type === SkeletonType.Minion) {
    return (
      <MinionSkeleton {...props} />
    )
  }

  if (props.type === SkeletonType.Rogue) {
    return (
      <RogueSkeleton {...props} />
    )
  }

  if (props.type === SkeletonType.Warrior) {
    return (
      <WarriorSkeleton {...props} />
    )
  }

  return null
}

export default Skeleton
