import React from 'react'
import { WeaponType } from 'types/user'
import { Sword } from 'features/Game/GameObject/Prop/Sword'
import { Axe } from 'features/Game/GameObject/Prop/Axe'
import { Dagger } from 'features/Game/GameObject/Prop/Dagger'
import type { ScalarCoords } from 'types/coords'

type Props = {
  readonly type: WeaponType
  readonly coords: ScalarCoords
}

const Weapon: React.FC<Props> = ({ type, coords }) => {
  if (type === WeaponType.Sword) {
    return (
      <Sword position={[coords[0] * 8, 1, coords[1] * 8]} />
    )
  }

  if (type === WeaponType.Dagger) {
    return (
      <Dagger position={[coords[0] * 8, 1, coords[1] * 8]} />
    )
  }

  if (type === WeaponType.Axe) {
    return (
      <Axe position={[coords[0] * 8, 1, coords[1] * 8]} />
    )
  }

  return null
}

export default Weapon
