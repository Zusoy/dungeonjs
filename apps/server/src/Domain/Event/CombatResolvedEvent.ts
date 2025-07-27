export type CombatResolvedEvent = {
  readonly succeed: boolean
  readonly firstDiceResult: number
  readonly secondDiceResult: number
  readonly inventoryBonus: number
}
