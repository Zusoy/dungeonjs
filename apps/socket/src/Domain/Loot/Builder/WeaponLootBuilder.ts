import { injectable, registry } from 'tsyringe'
import type { ILootBuilder } from 'Domain/Loot/ILootBuilder'
import { WeaponLoot, type Loot, LootType } from 'Domain/Model/Loot'
import type { Weapon } from 'Domain/Model/Weapon'

@injectable()
@registry([{ token: 'loot.builder', useClass: WeaponLootBuilder }])
export class WeaponLootBuilder implements ILootBuilder<Weapon> {
  supports(type: LootType, _item: Weapon): boolean {
    return type === LootType.Weapon
  }

  build(_type: LootType, item: Weapon): Loot {
    return new WeaponLoot(item)
  }
}
