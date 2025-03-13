import type { ScalarCoords } from 'types/coords'
import type { VectorTuple } from 'types/utils'

export enum Hero {
  Rogue = 'rogue',
  Knight = 'knight',
  Mage = 'mage',
  Barbarian = 'barbarian'
}

export type Weapon = {
  readonly id: string
  readonly name: string
  readonly icon: string
  readonly attack: number
}

export type Inventory = {
  readonly treasures: number
  readonly weapons: Weapon[]
}

export type UserPayload = {
  readonly id: string
  readonly username: string
  readonly color: string
  readonly hero: Hero
  readonly inventory: Inventory
  readonly position: VectorTuple
  readonly rotation: VectorTuple
  readonly coords: ScalarCoords
  readonly movesCount: number
  readonly host?: boolean
}
