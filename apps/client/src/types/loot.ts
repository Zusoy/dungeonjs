import type { ScalarCoords } from 'types/coords'
import type { Weapon } from 'types/weapon'
import type { Key } from 'types/object'

export enum LootType {
  Weapon = 'weapon',
  Key = 'key'
}

export interface ILoot<T> {
  readonly id: string
  readonly itemType: LootType
  readonly item: T
}

interface ILootable<T> extends ILoot<T> {
  readonly coords: ScalarCoords
}

export class WeaponLoot implements ILoot<Weapon> {
  public readonly id: string
  public readonly itemType = LootType.Weapon
  constructor(public readonly item: Weapon) {
    this.id = item.id
  }
}

export class LootableWeapon extends WeaponLoot implements ILootable<Weapon> {
  constructor(public readonly item: Weapon, public readonly coords: ScalarCoords) {
    super(item)
  }
}

export class KeyLoot implements ILoot<Key> {
  public readonly id: string
  public readonly itemType = LootType.Key
  constructor(public readonly item: Key) {
    this.id = item.id
  }
}

export class LootableKey extends KeyLoot implements ILootable<Key> {
  constructor(public readonly item: Key, public readonly coords: ScalarCoords) {
    super(item)
  }
}

export type LootObject = Weapon | Key
export type Loot = WeaponLoot | KeyLoot
export type WorldLoot = LootableWeapon | LootableKey
