import type { ScalarCoords } from 'Domain/Geometry/Coords'
import type { VectorTuple } from 'Domain/Geometry/Vector'
import type { Tile } from 'Domain/Model/Tile'

export type MoveEvent = {
  readonly coords: ScalarCoords
  readonly neighborTiles: Tile[]
  readonly fromDirection: VectorTuple
  readonly uncharted: boolean
}
