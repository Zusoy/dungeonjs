export enum WeaponType {
  Axe = 'axe',
  Sword = 'sword',
  Dagger = 'dagger'
}

export interface Weapon {
  readonly id: string,
  readonly name: string,
  readonly icon: string,
  readonly attack: number,
  readonly type: WeaponType,
}

export class Dagger implements Weapon {
  public readonly type = WeaponType.Dagger
  public readonly icon = '/img/weapon/dagger.png'

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly attack: number
  ) { }
}

export class Sword implements Weapon {
  public readonly type = WeaponType.Sword
  public readonly icon = '/img/weapon/sword.png'

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly attack: number
  ) { }
}

export class Axe implements Weapon {
  public readonly type = WeaponType.Axe
  public readonly icon = '/img/weapon/axe.png'

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly attack: number
  ) { }
}
