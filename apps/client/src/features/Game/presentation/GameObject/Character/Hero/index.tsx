import React from 'react'
import Barbarian from 'features/Game/presentation/GameObject/Character/Hero/Barbarian'
import Knight from 'features/Game/presentation/GameObject/Character/Hero/Knight'
import Mage from 'features/Game/presentation/GameObject/Character/Hero/Mage'
import Rogue from 'features/Game/presentation/GameObject/Character/Hero/Rogue'
import { Hero } from 'types/user'
import { Vector3 } from 'three'

type Props = JSX.IntrinsicElements['group'] & {
  readonly hero: Hero
  readonly username: string
  readonly color: string
  readonly position: Vector3
  readonly health: number
}

const HeroCharacter: React.FC<Props> = props => {
  if (props.hero === 'barbarian') {
    return (
      <Barbarian {...props} />
    )
  }

  if (props.hero === 'knight') {
    return (
      <Knight {...props} />
    )
  }

  if (props.hero === 'mage') {
    return (
      <Mage {...props} />
    )
  }

  if (props.hero === 'rogue') {
    return (
      <Rogue {...props} />
    )
  }

  return null
}

export default HeroCharacter
