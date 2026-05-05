import 'reflect-metadata'
import type { Tile } from 'Domain/Model/Tile'
import type { BuildTilePayload } from 'Domain/Tile/ITileBuilder'
import { describe, test, expect } from 'vitest'
import { CorridorBuilder } from 'Domain/Tile/Builder/CorridorBuilder'
import { Direction } from 'Domain/Geometry/Direction'

describe('Domain/Tile/CorridorBuilder', () => {
  test('should supports only corridor', () => {
    const builder = new CorridorBuilder()
    const payload: BuildTilePayload = {
      id: 'id',
      coords: [0, 0],
      direction: Direction.Up,
      adjacentTiles: []
    }

    expect(builder.supports('corridor', payload)).toBeTruthy()
  })

  test('should build horizontal corridor from direction', () => {
    const builder = new CorridorBuilder()
    const payload: BuildTilePayload = {
      id: 'id',
      coords: [0, 0],
      direction: Direction.Left,
      adjacentTiles: []
    }

    const actualTile = builder.build('corridor', payload)
    const expectedTile: Tile = { id: 'id', type: 'corridor', coords: [0, 0], directions: [Direction.Left, Direction.Right] }

    expect(actualTile).toStrictEqual(expectedTile)
  })

  test('should build vertical corridor from direction', () => {
    const builder = new CorridorBuilder()
    const payload: BuildTilePayload = {
      id: 'id',
      coords: [0, 0],
      direction: Direction.Up,
      adjacentTiles: []
    }

    const actualTile = builder.build('corridor', payload)
    const expectedTile: Tile = { id: 'id', type: 'corridor', coords: [0, 0], directions: [Direction.Up, Direction.Down] }

    expect(actualTile).toStrictEqual(expectedTile)
  })
})
