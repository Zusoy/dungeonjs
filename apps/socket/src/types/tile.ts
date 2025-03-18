import type { VectorTuple } from 'types/utils'
import type { ScalarCoords } from 'types/coords'

export enum TileType {
  Corridor = 'corridor',
  Room = 'room'
}

export interface Tile {
  readonly id: string
  readonly type: TileType
  readonly coords: ScalarCoords
  readonly directions: VectorTuple[]
}

export interface ConfigurableTile<T> extends Tile {
  readonly configuration: T
}

export type RoomConfiguration = {
  readonly shelves: ScalarCoords[]
}

export class RoomTile implements ConfigurableTile<RoomConfiguration> {
  public readonly type: TileType = TileType.Room

  constructor(
    public readonly id: string,
    public readonly coords: ScalarCoords,
    public readonly directions: VectorTuple[],
    public readonly configuration: RoomConfiguration
  ) {}
}

export class CorridorTile implements Tile {
  public readonly type: TileType = TileType.Corridor

  constructor(
    public readonly id: string,
    public readonly coords: ScalarCoords,
    public readonly directions: VectorTuple[]
  ) {}
}

export type Tiles =
  RoomTile |
  CorridorTile
