import type { Coords, VectorTuple } from 'services/socket'

export enum TileType {
  Corridor = 'corridor',
  Room = 'room'
}

export interface ITile {
  readonly id: string
  readonly type: TileType
  readonly coords: Coords
  readonly directions: VectorTuple[]
}

export class CorridorTile implements ITile {
  public readonly type = TileType.Corridor

  constructor(
    public readonly id: string,
    public readonly coords: Coords,
    public readonly directions: VectorTuple[]
  ) {}
}

export class RoomTile implements ITile {
  public readonly type = TileType.Room

  constructor(
    public readonly id: string,
    public readonly coords: Coords,
    public readonly directions: VectorTuple[]
  ) {}
}

export class Direction {
  public static readonly Left: VectorTuple = [-1, 0, 0]
  public static readonly Right: VectorTuple = [1, 0, 0]
  public static readonly Up: VectorTuple = [0, 0, 1]
  public static readonly Down: VectorTuple = [0, 0, -1]
  public static readonly All: VectorTuple[] = [
    Direction.Left,
    Direction.Right,
    Direction.Up,
    Direction.Down
  ]
}

export type Tiles =
  CorridorTile |
  RoomTile
