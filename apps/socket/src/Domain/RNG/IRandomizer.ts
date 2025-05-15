export interface IRandomizer {
  boolean(chance: number): boolean
  diceRoll(): number
  enumValue<T extends object>(enumObject: T): T[keyof T]
}
