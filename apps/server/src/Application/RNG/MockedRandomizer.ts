import type { IRandomizer } from 'Domain/RNG/IRandomizer'

type MockedRandomizerOptions = {
  readonly diceResult?: number,
  readonly enumResult?: any,
  readonly booleanResult?: boolean
}

export class MockedRandomizer implements IRandomizer {
  constructor(public readonly options?: MockedRandomizerOptions) { }

  diceRoll(): number {
    return this.options?.diceResult ?? 1
  }

  enumValue<T extends object>(_enumObject: T): T[keyof T] {
    return this.options?.enumResult ?? null
  }

  boolean(_chance: number): boolean {
    return this.options?.booleanResult ?? true
  }
}
