export type VectorTuple = [x: number, y: number, z: number]
export type Nullable<T> = T|null

export class Direction {
  public static readonly Left: VectorTuple = [-1, 0, 0]
  public static readonly Right: VectorTuple = [1, 0, 0]
  public static readonly Up: VectorTuple = [0, 0, -1]
  public static readonly Down: VectorTuple = [0, 0, 1]
  public static readonly All: VectorTuple[] = [
    Direction.Left,
    Direction.Right,
    Direction.Up,
    Direction.Down
  ]

  public static has(directions: VectorTuple[], direction: VectorTuple): boolean {
    return !!directions.find(
      dir => dir[0] === direction[0] && dir[1] === direction[1] && dir[2] === direction[2]
    )
  }
}
