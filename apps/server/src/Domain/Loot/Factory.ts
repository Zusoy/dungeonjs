import { injectable, injectAll } from 'tsyringe'
import type { ILootBuilder } from 'Domain/Loot/ILootBuilder'
import { Loot, LootableKey, LootableWeapon, LootType } from 'Domain/Model/Loot'
import { ScalarCoords } from 'Domain/Geometry/Coords'
import { LOOT_BUILDER } from 'Domain/tokens'

@injectable()
export class Factory {
  constructor(
    @injectAll(LOOT_BUILDER)
    private readonly builders: ILootBuilder<any>[]
  ) { }

  build<T>(type: LootType, item: T): Loot {
    const builder = this.builders.find(b => b.supports(type, item))

    if (!builder) {
      throw new Error(`Loot type ${type.toString()} not supported.`)
    }

    return builder.build(type, item)
  }

  buildLootable(loot: Loot, coords: ScalarCoords): LootableWeapon | LootableKey {
    switch (loot.itemType) {
      case 'weapon':
        return new LootableWeapon(loot.item, coords)
      case 'key':
        return new LootableKey(loot.item, coords)
    }
  }
}
