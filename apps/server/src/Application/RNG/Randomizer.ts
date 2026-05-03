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

  randomFrom<T>(values: T[], excludes: T[]): T {
    const pickValues = values.filter(value => !excludes.includes(value))
    return pickValues[Math.floor(Math.random() * pickValues.length)]
  }
}
