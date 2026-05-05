import { injectable, registry } from 'tsyringe'
import type { Tile, TileType } from 'Domain/Model/Tile'
import type { ITileBuilder, BuildTilePayload } from 'Domain/Tile/ITileBuilder'
import type { ScalarCoords } from 'Domain/Geometry/Coords'
import { Direction } from 'Domain/Geometry/Direction'
import { TILE_BUILDER } from 'Domain/tokens'

@injectable()
@registry([{ token: TILE_BUILDER, useClass: RoomBuilder }])
export class RoomBuilder implements ITileBuilder<'room'> {
  supports(type: TileType, _payload: BuildTilePayload): boolean {
    return type === 'room'
  }

  build(_type: TileType, payload: BuildTilePayload): Tile {
    const directions = Direction.All
      .filter(dir => {
        const dirCoords: ScalarCoords = [payload.coords[0] + dir[0], payload.coords[1] + dir[2]]
        const adjacentTile = payload.adjacentTiles.find(({ coords }) => coords[0] === dirCoords[0] && coords[1] === dirCoords[1])

        if (!adjacentTile) {
          return true
        }

        const opposite = Direction.opposite(dir)
        return adjacentTile.directions.some(dir => Direction.equals(opposite, dir))
      })

    return {
      id: payload.id,
      coords: payload.coords,
      type: 'room',
      directions
    }
  }
}
