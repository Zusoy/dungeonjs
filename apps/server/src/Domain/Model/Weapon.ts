import { z } from 'zod'

export enum WeaponType {
  Axe = 'axe',
  Sword = 'sword',
  Dagger = 'dagger'
}

export const WeaponSchema = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty(),
  icon: z.string().nonempty(),
  attack: z.number().nonnegative(),
  type: z.enum(WeaponType)
})

export type Weapon = z.infer<typeof WeaponSchema>

export class Dagger implements Weapon {
  public readonly type = WeaponType.Dagger
  public readonly name = 'Dagger'
  public readonly icon = '/img/weapon/dagger.png'
  public readonly attack = 1

  constructor(public readonly id: string) {}
}

export class Sword implements Weapon {
  public readonly type = WeaponType.Sword
  public readonly name = 'Sword'
  public readonly icon = '/img/weapon/sword.png'
  public readonly attack = 2

  constructor (public readonly id: string) {}
}

export class Axe implements Weapon {
  public readonly type = WeaponType.Axe
  public readonly name = 'Axe'
  public readonly icon = '/img/weapon/axe.png'
  public readonly attack = 3

  constructor (public readonly id: string) {}
}

export type PlayerWeapon =
  Sword |
  Dagger |
  Axe
