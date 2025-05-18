import { injectable, inject } from 'tsyringe'
import type { IRandomizer } from 'Domain/RNG/IRandomizer'
import { Axe, Dagger, Sword, type Weapon } from 'Domain/Model/Weapon'

@injectable()
export class WeaponRandomizer {
  constructor(
    @inject('rng')
    private readonly rng: IRandomizer,
    @inject('chance.loot.axe')
    private readonly axeLootChance: number,
    @inject('chance.loot.sword')
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
