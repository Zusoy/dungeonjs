import { injectable, registry } from 'tsyringe'
import { Direction } from 'Domain/Geometry/Direction'
import type { Tile, TileType } from 'Domain/Model/Tile'
import type { BuildTilePayload, ITileBuilder } from 'Domain/Tile/ITileBuilder'
import { TILE_BUILDER } from 'Domain/tokens'

@injectable()
@registry([{ token: TILE_BUILDER, useClass: CorridorBuilder }])
export class CorridorBuilder implements ITileBuilder<'corridor'> {
  supports(type: TileType, _payload: BuildTilePayload): boolean {
    return type === 'corridor'
  }

  build(_type: TileType, payload: BuildTilePayload): Tile {
    const directions = payload.direction[0] !== 0
      ? [Direction.Left, Direction.Right]
      : [Direction.Up, Direction.Down]

    return {
      id: payload.id,
      coords: payload.coords,
      type: 'corridor',
      directions
    }
  }
}
