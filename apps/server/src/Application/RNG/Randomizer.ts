import { injectable } from 'tsyringe'
import type { IRandomizer } from 'Domain/RNG/IRandomizer'

@injectable()
export class Randomizer implements IRandomizer {
  boolean(chance: number): boolean {
    if (chance < 0 || chance > 100) {
      throw new Error('Chance must be between 0 and 100')
    }

    return (Math.random() * 100) < chance
  }

  diceRoll(): number {
    return Math.floor(Math.random() * 6) + 1
  }

  enumValue<T extends object>(enumObject: T): T[keyof T] {
    const values = Object.values(enumObject)
    return values[Math.floor(Math.random() * values.length)]
  }
}
