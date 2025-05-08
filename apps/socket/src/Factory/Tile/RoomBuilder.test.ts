import 'reflect-metadata'
import { describe, test, expect } from 'vitest'
import { BuildTilePayload } from 'Factory/Tile/ITileBuilder'
import RoomBuilder from 'Factory/Tile/RoomBuilder'
import { Direction } from 'types/utils'
import { TileType } from 'types/tile'

describe('RoomBuilder', () => {
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
