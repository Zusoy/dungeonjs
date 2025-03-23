export type VectorTuple = [x: number, y: number, z: number]
export type Coords = [x: number, y: number]

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

  public static opposite(direction: VectorTuple): VectorTuple {
    const [x, _y, z] = direction

    if (x === -1) {
      return Direction.Right
    }

    if (x === 1) {
      return Direction.Left
    }

    if (z === -1) {
      return Direction.Down
    }

    if (z === 1) {
      return Direction.Up
    }

    return [0, 0, 0]
  }

  public static equals(a: VectorTuple, b: VectorTuple): boolean {
    return (a[0] === b[0]) && (a[1] === b[1]) && (a[2] === b[2])
  }

  public static random(): VectorTuple {
    const index = Math.floor(Math.random() * Direction.All.length)
    return Direction.All[index]
  }
}
