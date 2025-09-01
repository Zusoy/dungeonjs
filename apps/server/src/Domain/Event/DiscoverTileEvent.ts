import type { Tile } from 'Domain/Model/Tile'
import type { IGameEvent } from 'Domain/GameEvent'

export class DiscoverTileEvent implements IGameEvent {
  public readonly tag = 'discover_tile'
  constructor(public readonly tile: Tile) {}
}
