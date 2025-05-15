import 'reflect-metadata'
import type { BuildTilePayload } from 'Domain/Tile/ITileBuilder'
import { describe, test, expect } from 'vitest'
import { RoomBuilder } from 'Domain/Tile/Builder/RoomBuilder'
import { Direction } from 'Domain/Geometry/Direction'
import { TileType } from 'Domain/Model/Tile'

describe('Domain/Tile/RoomBuilder', () => {
  test ('should only supports Room tiles', () => {
    const builder = new RoomBuilder()
    const payload: BuildTilePayload = {
      id: 'id',
      coords: [0, 0],
      direction: Direction.Right,
      adjacentTiles: []
    }

    expect(builder.supports(TileType.Room, payload)).toBe(true)
  })

  test('should build a room with all directions', () => {
    const builder = new RoomBuilder()
    const payload: BuildTilePayload = {
      id: 'id',
      coords: [0, 0],
      direction: Direction.Right,
      adjacentTiles: []
    }

    const tile = builder.build(TileType.Room, payload)
    expect(tile.directions).toEqual(Direction.All)
  })
})
