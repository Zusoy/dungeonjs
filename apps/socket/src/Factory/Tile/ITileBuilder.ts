import type { Tile, Tiles, TileType } from 'types/tile'
import type { ScalarCoords } from 'types/coords'
import type { VectorTuple } from 'types/utils'

export type BuildTilePayload = {
  readonly id: string,
  readonly coords: ScalarCoords,
  readonly direction: VectorTuple,
  readonly adjacentTiles: Tile[]
}

export default interface ITileBuilder<T extends TileType> {
  supports(type: T, payload: BuildTilePayload): boolean
  build(type: T, payload: BuildTilePayload): Tiles
}
