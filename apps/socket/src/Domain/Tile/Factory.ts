import { injectable, injectAll } from 'tsyringe'
import type { Tiles, TileType } from 'Domain/Model/Tile'
import type { ITileBuilder, BuildTilePayload } from 'Domain/Tile/ITileBuilder'

@injectable()
export class Factory {
  constructor(
    @injectAll('tile.builder')
    private readonly builders: ITileBuilder<TileType>[]
  ) {
  }

  build(type: TileType, payload: BuildTilePayload): Tiles {
    const builders = Array.from(this.builders)
    const builder = builders.find(b => b.supports(type, payload))

    if (!builder) {
      throw new Error(`Tile type ${type.toString()} not supported.`)
    }

    return builder.build(type, payload)
  }
}
