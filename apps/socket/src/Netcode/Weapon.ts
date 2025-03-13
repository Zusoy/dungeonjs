import type INetcodeItem from 'Netcode/INetcodeItem'

export interface Weapon extends INetcodeItem {
  readonly id: string
  readonly name: string
  readonly icon: string
  readonly attack: number
}

export class Dagger implements Weapon {
  public readonly name = 'Dagger'
  public readonly icon = '/img/weapon/dagger.png'
  public readonly attack = 1

  constructor(public readonly id: string) {}

  public getId(): string {
    return this.id
  }
}

export class Sword implements Weapon {
  public readonly name = 'Sword'
  public readonly icon = '/img/weapon/sword.png'
  public readonly attack = 2

  constructor (public readonly id: string) {}

  public getId(): string {
    return this.id
  }
}

export class Axe implements Weapon {
  public readonly name = 'Axe'
  public readonly icon = '/img/weapon/axe.png'
  public readonly attack = 3

  constructor (public readonly id: string) {}

  public getId(): string {
    return this.id
  }
}
