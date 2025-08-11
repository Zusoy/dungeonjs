import type { IGameEvent } from 'Domain/GameEvent'

export class CombatResolvedEvent implements IGameEvent {
  public readonly tag = 'combat_resolved'

  constructor(
    public readonly succeed: boolean,
    public readonly firstDiceResult: number,
    public readonly secondDiceResult: number,
    public readonly inventoryBonus: number
  ) {}
}
