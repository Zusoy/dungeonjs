import 'reflect-metadata'
import type { BuildTilePayload } from 'Domain/Tile/ITileBuilder'
import { describe, test, expect } from 'vitest'
import { CorridorBuilder } from 'Domain/Tile/Builder/CorridorBuilder'
import { Direction } from 'Domain/Geometry/Direction'
import { CorridorTile, TileType } from 'Domain/Model/Tile'

describe('Domain/Tile/CorridorBuilder', () => {
  test('should supports only corridor', () => {
    const builder = new CorridorBuilder()
    const payload: BuildTilePayload = {
      id: 'id',
      coords: [0, 0],
      direction: Direction.Up,
      adjacentTiles: []
    }

    expect(builder.supports(TileType.Corridor, payload)).toBeTruthy()
  })

  test('should build horizontal corridor from direction', () => {
    const builder = new CorridorBuilder()
    const payload: BuildTilePayload = {
      id: 'id',
      coords: [0, 0],
      direction: Direction.Left,
      adjacentTiles: []
    }

    const actualTile = builder.build(TileType.Corridor, payload)
    const expectedTile = new CorridorTile('id', [0, 0], [Direction.Left, Direction.Right])

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

    const actualTile = builder.build(TileType.Corridor, payload)
    const expectedTile = new CorridorTile('id', [0, 0], [Direction.Up, Direction.Down])

    expect(actualTile).toStrictEqual(expectedTile)
  })

})