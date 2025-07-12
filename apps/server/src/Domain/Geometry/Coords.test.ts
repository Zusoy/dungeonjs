import { describe, test, expect } from 'vitest'
import { Coords, ScalarCoords } from './Coords'

describe('Geometry/Coords', () => {
  test('build from scalar coords', () => {
    const scalar: ScalarCoords = [1, 4]
    const coords = Coords.fromScalar(scalar)

    expect(coords.x).toBe(1)
    expect(coords.y).toBe(4)
  })

  test('sum coords', () => {
    const origin = Coords.fromScalar([0, 1])
    const coords = Coords.fromScalar([1, 2])
    const target = origin.sum(coords)

    expect(target.x).toBe(1)
    expect(target.y).toBe(3)
  })

  test('sub coords', () => {
    const origin = Coords.fromScalar([1, 3])
    const coords = Coords.fromScalar([1, 2])
    const target = origin.sub(coords)

    expect(target.x).toBe(0)
    expect(target.y).toBe(1)
  })

  test('coords equals', () => {
    const origin = Coords.fromScalar([1, 3])
    const target = Coords.fromScalar([1, 3])

    expect(origin.equals(target)).toBeTruthy()
    expect(Coords.fromScalar([0, 3]).equals(target)).toBeFalsy()
  })

  test('coords to scalar', () => {
    const origin = Coords.fromScalar([1, 3])
    const scalar = origin.toScalar()

    expect(scalar).toStrictEqual([1, 3])
  })
})
