import React from 'react'
import { Hero } from 'services/socket'
import Barbarian from 'features/Game/Character/Hero/Barbarian'
import Knight from 'features/Game/Character/Hero/Knight'
import Mage from 'features/Game/Character/Hero/Mage'
import Rogue from 'features/Game/Character/Hero/Rogue'
import { Vector3 } from 'three'

type Props = JSX.IntrinsicElements['group'] & {
  readonly hero: Hero
  readonly username: string
  readonly color: string
  readonly position: Vector3
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
