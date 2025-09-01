import { injectable, registry } from 'tsyringe'
import { Direction } from 'Domain/Geometry/Direction'
import { type Tiles, TileType, CorridorTile } from 'Domain/Model/Tile'
import type { BuildTilePayload, ITileBuilder } from 'Domain/Tile/ITileBuilder'
import { TILE_BUILDER } from 'Domain/tokens'

@injectable()
@registry([{ token: TILE_BUILDER, useClass: CorridorBuilder }])
export class CorridorBuilder implements ITileBuilder<TileType.Corridor> {
  supports(type: TileType.Corridor, _payload: BuildTilePayload): boolean {
    return type === TileType.Corridor
  }

  build(_type: TileType.Corridor, payload: BuildTilePayload): Tiles {
    const directions = payload.direction[0] !== 0
      ? [Direction.Left, Direction.Right]
      : [Direction.Up, Direction.Down]

    return new CorridorTile(
      payload.id,
      payload.coords,
      directions
    )
  }
}
