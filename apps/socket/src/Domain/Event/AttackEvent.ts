import type { ScalarCoords } from 'Domain/Geometry/Coords'

export type AttackEvent = {
  readonly enemyId: string
  readonly originCoords: ScalarCoords
}
