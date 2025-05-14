import type { PlayerPayload } from 'Domain/Model/Player'
import type { Skeleton } from 'Domain/Model/Skeleton'
import type { ScalarCoords } from 'Domain/Geometry/Coords'

export type StartFightEvent = {
  readonly playerId: PlayerPayload['id']
  readonly enemyId: Skeleton['id']
  readonly originCoords: ScalarCoords
}
