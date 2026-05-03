import { injectable, registry } from 'tsyringe'
import { WeaponLoot, type Loot, LootType } from 'Domain/Model/Loot'
import type { ILootBuilder } from 'Domain/Loot/ILootBuilder'
import type { Weapon } from 'Domain/Model/Weapon'
import { LOOT_BUILDER } from 'Domain/tokens'

@injectable()
@registry([{ token: LOOT_BUILDER, useClass: WeaponLootBuilder }])
export class WeaponLootBuilder implements ILootBuilder<Weapon> {
  supports(type: LootType, _item: Weapon): boolean {
    return type === 'weapon'
  }

  build(_type: LootType, item: Weapon): Loot {
    return new WeaponLoot(item)
  }
}
