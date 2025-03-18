import { injectable, registry } from 'tsyringe'
import ITileBuilder, { BuildTilePayload } from 'Factory/Tile/ITileBuilder'
import { CorridorTile, Tiles, TileType } from 'types/tile';
import { Direction } from 'types/utils';

@injectable()
@registry([{ token: 'tile.builder', useClass: CorridorBuilder }])
export default class CorridorBuilder implements ITileBuilder<TileType.Corridor> {
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
