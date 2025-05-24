import 'reflect-metadata'
import { describe, test, expect } from 'vitest'
import { MockedPlayerBroadcaster } from 'Application/Notification/MockedPlayerBroadcaster'
import { MockedPlayers } from 'Application/Repository/MockedPlayers'
import { MockedRooms } from 'Application/Repository/MockedRooms'
import { MockedServer } from 'Application/Websocket/MockedServer'
import { MockedSocket } from 'Application/Websocket/MockedSocket'
import { PickChestEvent } from 'Domain/Event/PickChestEvent'
import { PickChestHandler } from 'Domain/EventHandler/PickChestHandler'
import { PlayerNotInRoomError } from 'Domain/Error/PlayerNotInRoomError'
import { ObjectNotFoundError } from 'Domain/Error/ObjectNotFoundError'
import { Room } from 'Domain/Model/Room'
import { createPlayerMock } from 'test-utils'
import { Chest } from 'Domain/Model/Chest'
import { OperationDeniedError } from 'Domain/Error/OperationDeniedError'

describe('EventHandler/PickChest', () => {
  test('throws when player not in room', () => {
    const rooms = new MockedRooms([])
    const players = new MockedPlayers([])
    const broadcaster = new MockedPlayerBroadcaster()
    const server = new MockedServer([])
    const socket = new MockedSocket('player_id', null)

    const event: PickChestEvent = {
      chestId: 'chest_id'
    }

    const handler = new PickChestHandler(
      rooms,
      players,
      broadcaster,
      server
    )

    expect(() => handler.handle('pickChest', socket, event)).toThrow(new PlayerNotInRoomError('player_id'))
  })

  test('throws when room not found', () => {
    const rooms = new MockedRooms([])
    const players = new MockedPlayers([])
    const broadcaster = new MockedPlayerBroadcaster()
    const server = new MockedServer([])
    const socket = new MockedSocket('player_id', 'room_id')

    const event: PickChestEvent = {
      chestId: 'chest_id'
    }

    const handler = new PickChestHandler(
      rooms,
      players,
      broadcaster,
      server
    )

    expect(() => handler.handle('pickChest', socket, event)).toThrow(new ObjectNotFoundError('Room', 'room_id'))
  })

  test('throws when player not found', () => {
    const rooms = new MockedRooms([ new Room('room_id', 'player_id') ])
    const players = new MockedPlayers([])
    const broadcaster = new MockedPlayerBroadcaster()
    const server = new MockedServer([])
    const socket = new MockedSocket('player_id', 'room_id')

    const event: PickChestEvent = {
      chestId: 'chest_id'
    }

    const handler = new PickChestHandler(
      rooms,
      players,
      broadcaster,
      server
    )

    expect(() => handler.handle('pickChest', socket, event)).toThrow(new ObjectNotFoundError('Player', 'player_id'))
  })

  test('throws when chest not found', () => {
    const room = new Room('room_id', 'player_id')
    const player = createPlayerMock('player_id', 'username', [0, 0])

    const rooms = new MockedRooms([room])
    const players = new MockedPlayers([player])
    const broadcaster = new MockedPlayerBroadcaster()
    const server = new MockedServer([])
    const socket = new MockedSocket('player_id', 'room_id')

    const event: PickChestEvent = {
      chestId: 'chest_id'
    }

    const handler = new PickChestHandler(
      rooms,
      players,
      broadcaster,
      server
    )

    expect(() => handler.handle('pickChest', socket, event)).toThrow(new ObjectNotFoundError('Chest', 'chest_id'))
  })

  test('throws operation denied when chest is in different coords than player', () => {
    const room = new Room('room_id', 'player_id')
    const player = createPlayerMock('player_id', 'username', [0, 0])
    const chest: Chest = { id: 'chest_id', coords: [0, 1] }
    room.addChest(chest)

    const rooms = new MockedRooms([room])
    const players = new MockedPlayers([player])
    const broadcaster = new MockedPlayerBroadcaster()
    const server = new MockedServer([])
    const socket = new MockedSocket('player_id', 'room_id')

    const event: PickChestEvent = {
      chestId: 'chest_id'
    }

    const handler = new PickChestHandler(
      rooms,
      players,
      broadcaster,
      server
    )

    expect(() => handler.handle('pickChest', socket, event)).toThrow(OperationDeniedError)
  })

  test('throws operation denied when player does not have at least one key', () => {
    const room = new Room('room_id', 'player_id')
    const player = createPlayerMock('player_id', 'username', [0, 0])
    const chest: Chest = { id: 'chest_id', coords: [0, 0] }
    room.addChest(chest)

    const rooms = new MockedRooms([room])
    const players = new MockedPlayers([player])
    const broadcaster = new MockedPlayerBroadcaster()
    const server = new MockedServer([])
    const socket = new MockedSocket('player_id', 'room_id')

    const event: PickChestEvent = {
      chestId: 'chest_id'
    }

    const handler = new PickChestHandler(
      rooms,
      players,
      broadcaster,
      server
    )

    expect(() => handler.handle('pickChest', socket, event)).toThrow(OperationDeniedError)
  })

  test('picks the chest and updated the room', () => {
    const room = new Room('room_id', 'player_id')
    const player = createPlayerMock('player_id', 'username', [0, 0])
    player.addKey()
    const chest: Chest = { id: 'chest_id', coords: [0, 0] }
    room.addChest(chest)

    const rooms = new MockedRooms([room])
    const players = new MockedPlayers([player])
    const broadcaster = new MockedPlayerBroadcaster()
    const server = new MockedServer([])
    const socket = new MockedSocket('player_id', 'room_id')

    const event: PickChestEvent = {
      chestId: 'chest_id'
    }

    const handler = new PickChestHandler(
      rooms,
      players,
      broadcaster,
      server
    )

    handler.handle('pickChest', socket, event)
    const updatedRoom = rooms.find('room_id')
    const updatedPlayer = players.find('player_id')

    expect(updatedRoom).not.toBeNull()
    expect(updatedPlayer).not.toBeNull()
    expect(updatedPlayer!.inventory.keys).toBe(0)
    expect(updatedRoom!.getChests()).toHaveLength(0)
    expect(broadcaster.broadcastedRooms.includes('room_id')).toBeTruthy()
    expect(server.roomEmittedEvents['room_id']?.includes('chests')).toBeTruthy()
  })
})
