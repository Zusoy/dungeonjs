import type { ScalarCoords } from 'Domain/Geometry/Coords'
import type { IGameEvent } from 'Domain/GameEvent'

export class AttackEvent implements IGameEvent {
  public readonly tag = 'attack'

  constructor(
    public readonly enemyId: string,
    public readonly originCoords: ScalarCoords
  ) {}
}
