import 'reflect-metadata'
import { describe, test, expect } from 'vitest'
import type { LootEvent } from 'Domain/Event/LootEvent'
import { LootHandler } from 'Domain/EventHandler/LootHandler'
import { MockedRooms } from 'Application/Repository/MockedRooms'
import { MockedPlayers } from 'Application/Repository/MockedPlayers'
import { MockedPlayerBroadcaster } from 'Application/Notification/MockedPlayerBroadcaster'
import { MockedServer } from 'Application/Websocket/MockedServer'
import { MockedSocket } from 'Application/Websocket/MockedSocket'
import { OperationDeniedError } from 'Domain/Error/OperationDeniedError'
import { ObjectNotFoundError } from 'Domain/Error/ObjectNotFoundError'
import { Room } from 'Domain/Model/Room'
import { createLootableKeyMock, createLootableWeaponMock, createPlayerMock } from 'test-utils'
import { MockedTurnAllocator } from 'Application/Notification/MockedTurnAllocator'
import { PlayerNotInRoomError } from 'Domain/Error/PlayerNotInRoomError'

describe('EventHandler/Loot', () => {
  test('throws denied operation when not joined room', () => {
    const rooms = new MockedRooms([])
    const players = new MockedPlayers([])
    const broadcaster = new MockedPlayerBroadcaster()
    const server = new MockedServer([])
    const socket = new MockedSocket('player', null)
    const turnAllocator = new MockedTurnAllocator()

    const event: LootEvent = {
      lootId: 'lootId'
    }

    const handler = new LootHandler(
      rooms,
      players,
      broadcaster,
      turnAllocator,
      server,
      4,
      4
    )

    expect(() => handler.handle('loot', socket, event)).toThrow(new PlayerNotInRoomError('player'))
  })

  test('throws when room not found', () => {
    const rooms = new MockedRooms([])
    const players = new MockedPlayers([])
    const broadcaster = new MockedPlayerBroadcaster()
    const turnAllocator = new MockedTurnAllocator()
    const server = new MockedServer([])
    const socket = new MockedSocket('player', 'notFoundRoomId')

    const event: LootEvent = {
      lootId: 'lootId'
    }

    const handler = new LootHandler(
      rooms,
      players,
      broadcaster,
      turnAllocator,
      server,
      4,
      4
    )

    expect(() => handler.handle('loot', socket, event)).toThrow(new ObjectNotFoundError('Room', 'notFoundRoomId'))
  })

  test('throws when player not found', () => {
    const rooms = new MockedRooms([ new Room('roomId', 'playerId') ])
    const players = new MockedPlayers([])
    const broadcaster = new MockedPlayerBroadcaster()
    const turnAllocator = new MockedTurnAllocator()
    const server = new MockedServer([])
    const socket = new MockedSocket('playerId', 'roomId')

    const event: LootEvent = {
      lootId: 'lootId'
    }

    const handler = new LootHandler(
      rooms,
      players,
      broadcaster,
      turnAllocator,
      server,
      4,
      4
    )

    expect(() => handler.handle('loot', socket, event)).toThrow(new ObjectNotFoundError('Player', 'playerId'))
  })

  test('throws when loot not found in room', () => {
    const rooms = new MockedRooms([ new Room('roomId', 'playerId') ])
    const players = new MockedPlayers([ createPlayerMock('playerId', 'player') ])
    const broadcaster = new MockedPlayerBroadcaster()
    const turnAllocator = new MockedTurnAllocator()
    const server = new MockedServer([])
    const socket = new MockedSocket('playerId', 'roomId')

    const event: LootEvent = {
      lootId: 'lootId'
    }

    const handler = new LootHandler(
      rooms,
      players,
      broadcaster,
      turnAllocator,
      server,
      4,
      4
    )

    expect(() => handler.handle('loot', socket, event)).toThrow(new ObjectNotFoundError('Loot', 'lootId'))
  })

  test('throws when player is not in correct coords', () => {
    const room = new Room('roomId', 'playerId')
    room.addLoot(createLootableWeaponMock('lootId', [2, 2]))

    const rooms = new MockedRooms([ room ])
    const players = new MockedPlayers([ createPlayerMock('playerId', 'player', [1, 0]) ])
    const broadcaster = new MockedPlayerBroadcaster()
    const turnAllocator = new MockedTurnAllocator()
    const server = new MockedServer([])
    const socket = new MockedSocket('playerId', 'roomId')

    const event: LootEvent = {
      lootId: 'lootId'
    }

    const handler = new LootHandler(
      rooms,
      players,
      broadcaster,
      turnAllocator,
      server,
      4,
      4
    )

    expect(() => handler.handle('loot', socket, event)).toThrow(OperationDeniedError)
  })

  test('throws when player keys inventory is full', () => {
    const room = new Room('roomId', 'playerId')
    room.addLoot(createLootableKeyMock('lootId', [2, 2]))

    const rooms = new MockedRooms([ room ])
    const players = new MockedPlayers([ createPlayerMock('playerId', 'player', [2, 2]) ])
    const broadcaster = new MockedPlayerBroadcaster()
    const turnAllocator = new MockedTurnAllocator()
    const server = new MockedServer([])
    const socket = new MockedSocket('playerId', 'roomId')

    const event: LootEvent = {
      lootId: 'lootId'
    }

    const maxKeyCount = 0

    const handler = new LootHandler(
      rooms,
      players,
      broadcaster,
      turnAllocator,
      server,
      maxKeyCount,
      4
    )

    expect(() => handler.handle('loot', socket, event)).toThrow(OperationDeniedError)
  })

  test('throws when player weapons inventory is full', () => {
    const room = new Room('roomId', 'playerId')
    room.addLoot(createLootableWeaponMock('lootId', [2, 2]))

    const rooms = new MockedRooms([ room ])
    const players = new MockedPlayers([ createPlayerMock('playerId', 'player', [2, 2]) ])
    const broadcaster = new MockedPlayerBroadcaster()
    const turnAllocator = new MockedTurnAllocator()
    const server = new MockedServer([])
    const socket = new MockedSocket('playerId', 'roomId')

    const event: LootEvent = {
      lootId: 'lootId'
    }

    const maxKeyCount = 0
    const maxWeaponCount = 0

    const handler = new LootHandler(
      rooms,
      players,
      broadcaster,
      turnAllocator,
      server,
      maxKeyCount,
      maxWeaponCount
    )

    expect(() => handler.handle('loot', socket, event)).toThrow(OperationDeniedError)
  })

  test('loots an item in a room and broadcast updates and allocates next turn', () => {
    const room = new Room('roomId', 'playerId')
    const loot = createLootableWeaponMock('lootId', [2, 2])
    room.addLoot(loot)

    const rooms = new MockedRooms([ room ])
    const players = new MockedPlayers([ createPlayerMock('playerId', 'player', [2, 2]) ])
    const broadcaster = new MockedPlayerBroadcaster()
    const turnAllocator = new MockedTurnAllocator()
    const server = new MockedServer([])
    const socket = new MockedSocket('playerId', 'roomId')

    const event: LootEvent = {
      lootId: 'lootId'
    }

    const maxKeyCount = 4
    const maxWeaponCount = 4

    const handler = new LootHandler(
      rooms,
      players,
      broadcaster,
      turnAllocator,
      server,
      maxKeyCount,
      maxWeaponCount
    )

    handler.handle('loot', socket, event)

    const updatedPlayer = players.find('playerId')
    const updatedRoom = rooms.find('roomId')

    expect(updatedPlayer).not.toBeNull()
    expect(updatedRoom).not.toBeNull()
    expect(updatedPlayer!.inventory.weapons).toHaveLength(1)
    expect(updatedPlayer!.inventory.weapons[0]!.id).toBe('lootId')
    expect(updatedRoom!.getLoots()).toHaveLength(0)
    expect(broadcaster.broadcastedRooms.includes('roomId')).toBeTruthy()
    expect(server.roomEmittedEvents['roomId'].includes('loots')).toBeTruthy()
    expect(turnAllocator.turnRoomAllocated.includes('roomId')).toBeTruthy()
  })
})
