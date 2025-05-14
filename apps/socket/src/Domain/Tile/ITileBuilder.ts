import type { Tile, Tiles, TileType } from 'Domain/Model/Tile'
import type { ScalarCoords } from 'Domain/Geometry/Coords'
import type { VectorTuple } from 'Domain/Geometry/Vector'

export type BuildTilePayload = {
  readonly id: string,
  readonly coords: ScalarCoords,
  readonly direction: VectorTuple,
  readonly adjacentTiles: Tile[]
}

export interface ITileBuilder<T extends TileType> {
  supports(type: T, payload: BuildTilePayload): boolean
  build(type: T, payload: BuildTilePayload): Tiles
}
