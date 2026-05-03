import { z } from 'zod'

export const ScalarCoordsSchema = z.tuple([z.number(), z.number()])
export type ScalarCoords = z.infer<typeof ScalarCoordsSchema>

export class Coords {
  public static fromScalar(coords: ScalarCoords): Coords {
    return new Coords(coords[0], coords[1])
  }

  constructor(public readonly x: number, public readonly y: number) {
  }

  public sum(coords: Coords): Coords {
    return new Coords(this.x + coords.x, this.y + coords.y)
  }

  public sub(coords: Coords): Coords {
    return new Coords(this.x - coords.x, this.y - coords.y)
  }

  public equals(coords: Coords): boolean {
    return this.x === coords.x && this.y === coords.y
  }

  public toScalar(): ScalarCoords {
    return [this.x, this.y]
  }
}
