import { injectable, registry } from 'tsyringe'
import { KeyLoot, type Loot, LootType } from 'Domain/Model/Loot'
import type { ILootBuilder } from 'Domain/Loot/ILootBuilder'
import type { Key } from 'Domain/Model/Key'

@injectable()
@registry([{ token: 'loot.builder', useClass: KeyLootBuilder }])
export class KeyLootBuilder implements ILootBuilder<Key> {
  supports(type: LootType, _item: Key): boolean {
    return type === LootType.Key
  }

  build(_type: LootType, item: Key): Loot {
    return new KeyLoot(item)
  }
}
