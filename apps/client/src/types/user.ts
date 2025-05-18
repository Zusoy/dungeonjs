import type { ScalarCoords } from 'types/coords'
import type { VectorTuple } from 'types/utils'

export enum Hero {
  Rogue = 'rogue',
  Knight = 'knight',
  Mage = 'mage',
  Barbarian = 'barbarian'
}

export enum WeaponType {
  Axe = 'axe',
  Sword = 'sword',
  Dagger = 'dagger'
}

export type Weapon = {
  readonly id: string
  readonly name: string
  readonly icon: string
  readonly attack: number
  readonly type: WeaponType
}

export type Inventory = {
  readonly treasures: number
  readonly weapons: Weapon[]
}

export type UserPayload = {
  readonly id: string
  readonly username: string
  readonly color: string
  readonly health: number
  readonly hero: Hero
  readonly inventory: Inventory
  readonly position: VectorTuple
  readonly rotation: VectorTuple
  readonly coords: ScalarCoords
  readonly movesCount: number
  readonly host?: boolean
}
