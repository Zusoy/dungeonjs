import 'reflect-metadata'
import { LootEvent } from 'Domain/Event/LootEvent'
import { describe, test, expect } from 'vitest'
import { LootHandler } from 'Domain/EventHandler/LootHandler'
import { MockedRooms } from 'Application/Repository/MockedRooms'
import { MockedPlayers } from 'Application/Repository/MockedPlayers'
import { MockedPlayerBroadcaster } from 'Application/Notification/MockedPlayerBroadcaster'
import { MockedServer } from 'Infra/Websocket/MockedServer'
import { MockedSocket } from 'Infra/Websocket/MockedSocket'
import { OperationDeniedError } from 'Domain/Error/OperationDeniedError'
import { ObjectNotFoundError } from 'Domain/Error/ObjectNotFoundError'
import { Room } from 'Domain/Model/Room'
import { createLootableKeyMock, createLootableWeaponMock, createPlayerMock } from 'test-utils'
import { PlayerNotInRoomError } from 'Domain/Error/PlayerNotInRoomError'

describe('EventHandler/Loot', () => {
  test('throws denied operation when not joined room', async () => {
    const rooms = new MockedRooms([])
    const players = new MockedPlayers([])
    const broadcaster = new MockedPlayerBroadcaster()
    const server = new MockedServer([])
    const socket = new MockedSocket('player', null)

    const event = new LootEvent('lootId')

    const handler = new LootHandler(
      rooms,
      players,
      broadcaster,
      server,
      4,
      4
    )

    await expect(handler.handle('loot', socket, event)).rejects.toThrow(new PlayerNotInRoomError('player'))
  })

  test('throws when room not found', async () => {
    const rooms = new MockedRooms([])
    const players = new MockedPlayers([])
    const broadcaster = new MockedPlayerBroadcaster()
    const server = new MockedServer([])
    const socket = new MockedSocket('player', 'notFoundRoomId')

    const event = new LootEvent('lootId')

    const handler = new LootHandler(
      rooms,
      players,
      broadcaster,
      server,
      4,
      4
    )

    await expect(handler.handle('loot', socket, event)).rejects.toThrow(new ObjectNotFoundError('Room', 'notFoundRoomId'))
  })

  test('throws when player not found', async () => {
    const rooms = new MockedRooms([ new Room('roomId', 'playerId') ])
    const players = new MockedPlayers([])
    const broadcaster = new MockedPlayerBroadcaster()
    const server = new MockedServer([])
    const socket = new MockedSocket('playerId', 'roomId')

    const event = new LootEvent('lootId')

    const handler = new LootHandler(
      rooms,
      players,
      broadcaster,
      server,
      4,
      4
    )

    await expect(handler.handle('loot', socket, event)).rejects.toThrow(new ObjectNotFoundError('Player', 'playerId'))
  })

  test('throws when loot not found in room', async () => {
    const rooms = new MockedRooms([ new Room('roomId', 'playerId') ])
    const players = new MockedPlayers([ createPlayerMock('playerId', 'player') ])
    const broadcaster = new MockedPlayerBroadcaster()
    const server = new MockedServer([])
    const socket = new MockedSocket('playerId', 'roomId')

    const event = new LootEvent('lootId')

    const handler = new LootHandler(
      rooms,
      players,
      broadcaster,
      server,
      4,
      4
    )

    await expect(handler.handle('loot', socket, event)).rejects.toThrow(new ObjectNotFoundError('Loot', 'lootId'))
  })

  test('throws when player is not in correct coords', async () => {
    const room = new Room('roomId', 'playerId')
    room.addLoot(createLootableWeaponMock('lootId', [2, 2]))

    const rooms = new MockedRooms([ room ])
    const players = new MockedPlayers([ createPlayerMock('playerId', 'player', [1, 0]) ])
    const broadcaster = new MockedPlayerBroadcaster()
    const server = new MockedServer([])
    const socket = new MockedSocket('playerId', 'roomId')

    const event = new LootEvent('lootId')

    const handler = new LootHandler(
      rooms,
      players,
      broadcaster,
      server,
      4,
      4
    )

    await expect(handler.handle('loot', socket, event)).rejects.toThrow(OperationDeniedError)
  })

  test('throws when player keys inventory is full', async () => {
    const room = new Room('roomId', 'playerId')
    room.addLoot(createLootableKeyMock('lootId', [2, 2]))

    const rooms = new MockedRooms([ room ])
    const players = new MockedPlayers([ createPlayerMock('playerId', 'player', [2, 2]) ])
    const broadcaster = new MockedPlayerBroadcaster()
    const server = new MockedServer([])
    const socket = new MockedSocket('playerId', 'roomId')

    const event = new LootEvent('lootId')

    const maxKeyCount = 0

    const handler = new LootHandler(
      rooms,
      players,
      broadcaster,
      server,
      maxKeyCount,
      4
    )

    await expect(handler.handle('loot', socket, event)).rejects.toThrow(OperationDeniedError)
  })

  test('throws when player weapons inventory is full', async () => {
    const room = new Room('roomId', 'playerId')
    room.addLoot(createLootableWeaponMock('lootId', [2, 2]))

    const rooms = new MockedRooms([ room ])
    const players = new MockedPlayers([ createPlayerMock('playerId', 'player', [2, 2]) ])
    const broadcaster = new MockedPlayerBroadcaster()
    const server = new MockedServer([])
    const socket = new MockedSocket('playerId', 'roomId')

    const event = new LootEvent('lootId')

    const maxKeyCount = 0
    const maxWeaponCount = 0

    const handler = new LootHandler(
      rooms,
      players,
      broadcaster,
      server,
      maxKeyCount,
      maxWeaponCount
    )

    await expect(handler.handle('loot', socket, event)).rejects.toThrow(OperationDeniedError)
  })

  test('loots an item in a room and broadcast updates', async () => {
    const room = new Room('roomId', 'playerId')
    const loot = createLootableWeaponMock('lootId', [2, 2])
    room.addLoot(loot)

    const rooms = new MockedRooms([ room ])
    const players = new MockedPlayers([ createPlayerMock('playerId', 'player', [2, 2]) ])
    const broadcaster = new MockedPlayerBroadcaster()
    const server = new MockedServer([])
    const socket = new MockedSocket('playerId', 'roomId')

    const event = new LootEvent('lootId')

    const maxKeyCount = 4
    const maxWeaponCount = 4

    const handler = new LootHandler(
      rooms,
      players,
      broadcaster,
      server,
      maxKeyCount,
      maxWeaponCount
    )

    await handler.handle('loot', socket, event)

    const updatedPlayer = players.find('playerId')
    const updatedRoom = rooms.find('roomId')

    expect(updatedPlayer).not.toBeNull()
    expect(updatedRoom).not.toBeNull()
    expect(updatedPlayer!.inventory.weapons).toHaveLength(1)
    expect(updatedPlayer!.inventory.weapons[0]!.id).toBe('lootId')
    expect(updatedPlayer!.movesCount).toBe(0)
    expect(updatedRoom!.getLoots()).toHaveLength(0)
    expect(broadcaster.broadcastedRooms.includes('roomId')).toBeTruthy()
    expect(server.roomEmittedEvents['roomId'].includes('loots')).toBeTruthy()
  })
})
