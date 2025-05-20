import { Loot, LootObject, LootType } from 'Domain/Model/Loot'

export interface ILootBuilder<T extends LootObject> {
  supports(type: LootType, item: T): boolean
  build(type: LootType, item: T): Loot
}
