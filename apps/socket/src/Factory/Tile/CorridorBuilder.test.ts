import 'reflect-metadata'
import { describe, test, expect } from 'vitest'
import { BuildTilePayload } from 'Factory/Tile/ITileBuilder'
import CorridorBuilder from 'Factory/Tile/CorridorBuilder'
import { Direction } from 'types/utils'
import { CorridorTile, TileType } from 'types/tile'

describe('CorridorBuilder', () => {
  test('should supports only corridor', () => {
    const builder = new CorridorBuilder()
    const payload: BuildTilePayload = {
      id: 'id',
      coords: [0, 0],
      direction: Direction.Right,
      adjacentTiles: []
    }

    expect(builder.supports(TileType.Corridor, payload)).toBe(true)
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
