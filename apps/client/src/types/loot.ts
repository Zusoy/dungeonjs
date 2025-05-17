import type { ScalarCoords } from 'types/coords'
import type { Weapon } from 'types/user'
import type { Key } from 'types/object'

export enum LootType {
  Weapon = 'weapon',
  Key = 'key'
}

interface ILoot<T> {
  readonly id: string
  readonly coords: ScalarCoords
  readonly itemType: LootType
  readonly item: T
}

export class WeaponLoot implements ILoot<Weapon> {
  public readonly id: string
  public readonly itemType: LootType = LootType.Weapon
  constructor(public readonly coords: ScalarCoords, public readonly item: Weapon) {
    this.id = item.id
  }
}

export class KeyLoot implements ILoot<Key> {
  public readonly id: string
  public readonly itemType: LootType = LootType.Key
  constructor(public readonly coords: ScalarCoords, public readonly item: Key) {
    this.id = item.id
  }
}

export type Loot = WeaponLoot | KeyLoot
