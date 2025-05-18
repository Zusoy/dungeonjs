import { injectable, injectAll } from 'tsyringe'
import type { ILootBuilder } from 'Domain/Loot/ILootBuilder'
import { ILoot, Loot, LootableKey, LootableWeapon, LootType, WorldLoot } from 'Domain/Model/Loot'
import { ScalarCoords } from 'Domain/Geometry/Coords'

@injectable()
export class Factory {
  constructor(
    @injectAll('loot.builder')
    private readonly builders: ILootBuilder<any>[]
  ) { }

  build<T>(type: LootType, item: T): ILoot<T> {
    const builder = this.builders.find(b => b.supports(type, item))

    if (!builder) {
      throw new Error(`Loot type ${type.toString()} not supported.`)
    }

    return builder.build(type, item)
  }

  buildLootable(loot: Loot, coords: ScalarCoords): WorldLoot {
    switch (loot.itemType) {
      case LootType.Weapon:
        return new LootableWeapon(loot.item, coords)
      case LootType.Key:
        return new LootableKey(loot.item, coords)
    }
  }
}
