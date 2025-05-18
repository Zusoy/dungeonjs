import { injectable, registry } from 'tsyringe'
import type { ILootBuilder } from 'Domain/Loot/ILootBuilder'
import { type ILoot, KeyLoot, LootType } from 'Domain/Model/Loot'
import type { Key } from 'Domain/Model/Key'

@injectable()
@registry([{ token: 'loot.builder', useClass: KeyLootBuilder }])
export class KeyLootBuilder implements ILootBuilder<Key> {
  supports(type: LootType, _item: Key): boolean {
    return type === LootType.Key
  }

  build(_type: LootType, item: Key): ILoot<Key> {
    return new KeyLoot(item)
  }
}
