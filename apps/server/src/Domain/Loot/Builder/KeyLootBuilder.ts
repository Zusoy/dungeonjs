import { injectable, registry } from 'tsyringe'
import { KeyLoot, type Loot, LootType } from 'Domain/Model/Loot'
import type { ILootBuilder } from 'Domain/Loot/ILootBuilder'
import type { Key } from 'Domain/Model/Key'
import { LOOT_BUILDER } from 'Domain/tokens'

@injectable()
@registry([{ token: LOOT_BUILDER, useClass: KeyLootBuilder }])
export class KeyLootBuilder implements ILootBuilder<Key> {
  supports(type: LootType, _item: Key): boolean {
    return type === 'key'
  }

  build(_type: LootType, item: Key): Loot {
    return new KeyLoot(item)
  }
}
