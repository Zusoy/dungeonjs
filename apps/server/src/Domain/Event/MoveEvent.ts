import type { IGameEvent } from 'Domain/GameEvent'
import type { ScalarCoords } from 'Domain/Geometry/Coords'
import type { VectorTuple } from 'Domain/Geometry/Vector'
import type { Tile } from 'Domain/Model/Tile'

export class MoveEvent implements IGameEvent {
  public readonly tag = 'move'

  constructor(
    public readonly coords: ScalarCoords,
    public readonly neighborTiles: Tile[],
    public readonly fromDirection: VectorTuple,
    public readonly uncharted: boolean
  ) {}
}
