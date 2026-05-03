export interface IRandomizer {
  boolean(chance: number): boolean
  diceRoll(): number
  randomFrom<T>(values: T[], excludes: T[]): T
}
