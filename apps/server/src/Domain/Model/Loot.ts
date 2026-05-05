import { z } from 'zod'
import { ScalarCoordsSchema, type ScalarCoords } from 'Domain/Geometry/Coords'
import { WeaponSchema, type Weapon } from 'Domain/Model/Weapon'
import { KeySchema, type Key } from 'Domain/Model/Key'

export const LootTypeSchema = z.enum(['weapon', 'key'])
export const LootObjectSchema = z.union([WeaponSchema, KeySchema])

export const BaseLootSchema = z.object({
  id: z.string().nonempty(),
  itemType: LootTypeSchema
})

export const WeaponLootSchema = BaseLootSchema.extend({
  itemType: z.literal('weapon'),
  item: WeaponSchema
})

export const KeyLootSchema = BaseLootSchema.extend({
  itemType: z.literal('key'),
  item: KeySchema
})

export const LootSchema = z.discriminatedUnion('itemType', [
  WeaponLootSchema,
  KeyLootSchema
])

export const WithCoordsSchema = z.object({
  coords: ScalarCoordsSchema
})

export const WorldLootSchema = LootSchema.and(WithCoordsSchema)

export class WeaponLoot {
  public readonly id: string
  public readonly itemType = 'weapon' as const
  constructor(public readonly item: Weapon) {
    this.id = item.id
  }
}

export class LootableWeapon extends WeaponLoot {
  constructor(public readonly item: Weapon, public readonly coords: ScalarCoords) {
    super(item)
  }
}

export class KeyLoot {
  public readonly id: string
  public readonly itemType = 'key' as const
  constructor(public readonly item: Key) {
    this.id = item.id
  }
}

export class LootableKey extends KeyLoot {
  constructor(public readonly item: Key, public readonly coords: ScalarCoords) {
    super(item)
  }
}

export type LootType = z.infer<typeof LootTypeSchema>
export type LootObject = z.infer<typeof LootObjectSchema>
export type Loot = z.infer<typeof LootSchema>
export type WorldLoot = z.infer<typeof WorldLootSchema>
export type WithCoords = z.infer<typeof WithCoordsSchema>
