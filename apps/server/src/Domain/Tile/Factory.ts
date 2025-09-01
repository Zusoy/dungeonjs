import { injectable, injectAll } from 'tsyringe'
import type { Tiles, TileType } from 'Domain/Model/Tile'
import type { ITileBuilder, BuildTilePayload } from 'Domain/Tile/ITileBuilder'
import { TILE_BUILDER } from 'Domain/tokens'

@injectable()
export class Factory {
  constructor(
    @injectAll(TILE_BUILDER)
    private readonly builders: ITileBuilder<TileType>[]
  ) {
  }

  build(type: TileType, payload: BuildTilePayload): Tiles {
    const builder = this.builders.find(b => b.supports(type, payload))

    if (!builder) {
      throw new Error(`Tile type ${type.toString()} not supported.`)
    }

    return builder.build(type, payload)
  }
}
