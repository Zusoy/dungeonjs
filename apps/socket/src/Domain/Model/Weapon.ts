export enum WeaponType {
  Axe = 'axe',
  Sword = 'sword',
  Dagger = 'dagger'
}

export interface Weapon {
  readonly id: string
  readonly name: string
  readonly icon: string
  readonly attack: number
  readonly type: WeaponType
}

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
