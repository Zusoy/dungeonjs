import { injectable, registry } from 'tsyringe'
import ITileBuilder, { BuildTilePayload } from 'Factory/Tile/ITileBuilder'
import type { ScalarCoords } from 'types/coords'
import { RoomTile, Tiles, TileType } from 'types/tile'
import { Direction } from 'types/utils'

@injectable()
@registry([{ token: 'tile.builder', useClass: RoomBuilder }])
export default class RoomBuilder implements ITileBuilder<TileType.Room> {
  supports(type: TileType.Room, _payload: BuildTilePayload): boolean {
    return type === TileType.Room
  }

  build(_type: TileType.Room, payload: BuildTilePayload): Tiles {
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

    return new RoomTile(
      payload.id,
      payload.coords,
      directions,
      { shelves: [] }
    )
  }
}
