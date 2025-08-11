import type { PlayerPayload } from 'Domain/Model/Player'
import type { Skeleton } from 'Domain/Model/Skeleton'
import type { ScalarCoords } from 'Domain/Geometry/Coords'
import type { IGameEvent } from 'Domain/GameEvent'

export class EngageCombatEvent implements IGameEvent {
  public readonly tag = 'engage_combat'

  constructor(
    public readonly playerId: PlayerPayload['id'],
    public readonly enemyId: Skeleton['id'],
    public readonly originCoords: ScalarCoords
  ) {}
}
