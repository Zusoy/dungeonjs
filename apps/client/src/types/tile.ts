import type { VectorTuple } from 'types/utils'
import type { ScalarCoords } from 'types/coords'

export enum TileType {
  Corridor = 'corridor',
  Room = 'room'
}

export type Tile = {
  readonly id: string
  readonly type: TileType
  readonly coords: ScalarCoords
  readonly directions: VectorTuple[]
}
