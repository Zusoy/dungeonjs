import { injectable, inject } from 'tsyringe'
import type { IRandomizer } from 'Domain/RNG/IRandomizer'
import { Axe, Dagger, Sword, type Weapon } from 'Domain/Model/Weapon'
import { LOOT_AXE_CHANCE_PARAMETER, LOOT_SWORD_CHANCE_PARAMETER, RNG } from 'Domain/tokens'

@injectable()
export class WeaponRandomizer {
  constructor(
    @inject(RNG)
    private readonly rng: IRandomizer,
    @inject(LOOT_AXE_CHANCE_PARAMETER)
    private readonly axeLootChance: number,
    @inject(LOOT_SWORD_CHANCE_PARAMETER)
    private readonly swordLootChance: number
  ) {}

  public randomWeapon(id: string): Weapon {
    const isAxe = this.rng.boolean(this.axeLootChance)
    const isSword = this.rng.boolean(this.swordLootChance)

    if (isAxe) {
      return new Axe(id)
    }

    if (isSword) {
      return new Sword(id)
    }

    return new Dagger(id)
  }
}
