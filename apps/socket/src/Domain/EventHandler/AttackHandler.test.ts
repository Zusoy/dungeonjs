import 'reflect-metadata'
import { describe, test, expect } from 'vitest'
import { AttackHandler } from 'Domain/EventHandler/AttackHandler'
import { MockedServer } from 'Application/Websocket/MockedServer'
import { MockedPlayers } from 'Application/Repository/MockedPlayers'
import { MockedRooms } from 'Application/Repository/MockedRooms'
import { MockedTurnAllocator } from 'Application/Notification/MockedTurnAllocator'
import { MockedPlayerBroadcaster } from 'Application/Notification/MockedPlayerBroadcaster'
import { MockedSocket } from 'Application/Websocket/MockedSocket'
import { AttackEvent } from 'Domain/Event/AttackEvent'
import { ObjectNotFoundError } from 'Domain/Error/ObjectNotFoundError'
import { Room } from 'Domain/Model/Room'
import { createMinionSkeletonMock, createPlayerMock, createWeaponLootMock } from 'test-utils'
import { OperationDeniedError } from 'Domain/Error/OperationDeniedError'
import { MockedRandomizer } from 'Application/RNG/MockedRandomizer'
import { Factory as LootFactory } from 'Domain/Loot/Factory'
import { KeyLootBuilder } from 'Domain/Loot/Builder/KeyLootBuilder'
import { WeaponLootBuilder } from 'Domain/Loot/Builder/WeaponLootBuilder'
import { Player } from 'Domain/Model/Player'
import { Coords } from 'Domain/Geometry/Coords'
import { LootableWeapon } from 'Domain/Model/Loot'

describe('EventHandler/Attack', () => {
  test('throws when player not found', () => {
    const server = new MockedServer()
    const players = new MockedPlayers([])
    const rooms = new MockedRooms([])
    const turnAllocator = new MockedTurnAllocator()
    const broadcaster = new MockedPlayerBroadcaster()
    const socket = new MockedSocket('player', 'room')
    const random = new MockedRandomizer()
    const loots = new LootFactory([ new KeyLootBuilder(), new WeaponLootBuilder() ])

    const event: AttackEvent = {
      enemyId: 'enemy',
      originCoords: [0, 0]
    }

    const handler = new AttackHandler(
      server,
      players,
      rooms,
      turnAllocator,
      broadcaster,
      loots,
      random
    )
    expect(() => handler.handle('attack', socket, event)).toThrow(new ObjectNotFoundError("Player", "player"))
  })

  test('throws not authorized when not joined room', () => {
    const server = new MockedServer()
    const players = new MockedPlayers([createPlayerMock('player', 'username')])
    const rooms = new MockedRooms([new Room('room', 'player')])
    const turnAllocator = new MockedTurnAllocator()
    const broadcaster = new MockedPlayerBroadcaster()
    const socket = new MockedSocket('player', null)
    const random = new MockedRandomizer()
    const loots = new LootFactory([ new KeyLootBuilder(), new WeaponLootBuilder() ])

    const event: AttackEvent = {
      enemyId: 'enemy',
      originCoords: [0, 0]
    }

    const handler = new AttackHandler(
      server,
      players,
      rooms,
      turnAllocator,
      broadcaster,
      loots,
      random
    )
    expect(() => handler.handle('attack', socket, event)).toThrow(OperationDeniedError)
  })

  test('throws when room not found', () => {
    const server = new MockedServer()
    const players = new MockedPlayers([createPlayerMock('player', 'username')])
    const rooms = new MockedRooms([])
    const turnAllocator = new MockedTurnAllocator()
    const broadcaster = new MockedPlayerBroadcaster()
    const socket = new MockedSocket('player', 'room')
    const random = new MockedRandomizer()
    const loots = new LootFactory([ new KeyLootBuilder(), new WeaponLootBuilder() ])

    const event: AttackEvent = {
      enemyId: 'enemy',
      originCoords: [0, 0]
    }

    const handler = new AttackHandler(
      server,
      players,
      rooms,
      turnAllocator,
      broadcaster,
      loots,
      random
    )

    expect(() => handler.handle('attack', socket, event)).toThrow(new ObjectNotFoundError("Room", "room"))
  })

  test('throws when enemy not found', () => {
    const server = new MockedServer()
    const players = new MockedPlayers([createPlayerMock('player', 'username')])
    const rooms = new MockedRooms([new Room('room', 'player')])
    const turnAllocator = new MockedTurnAllocator()
    const broadcaster = new MockedPlayerBroadcaster()
    const socket = new MockedSocket('player', 'room')
    const random = new MockedRandomizer()
    const loots = new LootFactory([ new KeyLootBuilder(), new WeaponLootBuilder() ])

    const event: AttackEvent = {
      enemyId: 'enemy',
      originCoords: [0, 0]
    }

    const handler = new AttackHandler(
      server,
      players,
      rooms,
      turnAllocator,
      broadcaster,
      loots,
      random
    )

    expect(() => handler.handle('attack', socket, event)).toThrow(new ObjectNotFoundError("Enemy", "enemy"))
  })

  test('handles not succeed attack', () => {
    const server = new MockedServer()
    const player = new Player(
      'player',
      'username',
      '#ffff',
      'barbarian',
      { weapons: [], treasures: 0 },
      [0, 0, 0],
      [0, 0, 0],
      [1, 1],
      4
    )
    const loots = new LootFactory([ new KeyLootBuilder(), new WeaponLootBuilder() ])

    const players = new MockedPlayers([player])
    const room = new Room('room', 'player')

    const loot = createWeaponLootMock('weapon_loot')
    const skeleton = createMinionSkeletonMock('enemy', loot)
    room.addEnemy(skeleton)

    const rooms = new MockedRooms([room])
    const turnAllocator = new MockedTurnAllocator()
    const broadcaster = new MockedPlayerBroadcaster()
    const socket = new MockedSocket('player', 'room')
    const random = new MockedRandomizer({ diceResult: 1 })

    const event: AttackEvent = {
      enemyId: 'enemy',
      originCoords: [0, 0]
    }

    const handler = new AttackHandler(
      server,
      players,
      rooms,
      turnAllocator,
      broadcaster,
      loots,
      random
    )

    handler.handle('attack', socket, event)

    const updatedPlayer = players.find('player')
    const updatedRoom = rooms.find('room')
    const targetCoords = Coords.fromScalar([0, 0])

    expect(updatedPlayer).not.toBeNull()
    expect(updatedRoom).not.toBeNull()
    expect(updatedRoom!.getLoots()).toHaveLength(0)
    expect(Coords.fromScalar(updatedPlayer!.coords).equals(targetCoords)).toBeTruthy()
    expect(updatedPlayer!.health).toBe(4)
    expect(server.roomEmittedEvents['room']?.includes('attacked')).toBeTruthy()
    expect(server.roomEmittedEvents['room']?.includes('loots')).toBeFalsy()
    expect(broadcaster.broadcastedRooms.includes('room')).toBeTruthy()
    expect(turnAllocator.turnRoomAllocated.includes('room')).toBeTruthy()
  })

  test('handles succeed attack', () => {
    const server = new MockedServer()
    const player = new Player(
      'player',
      'username',
      '#ffff',
      'barbarian',
      { weapons: [], treasures: 0 },
      [0, 0, 0],
      [0, 0, 0],
      [1, 1],
      4
    )

    const players = new MockedPlayers([player])
    const loots = new LootFactory([ new KeyLootBuilder(), new WeaponLootBuilder() ])

    const room = new Room('room', 'player')
    const loot = createWeaponLootMock('weapon_loot')
    const skeleton = createMinionSkeletonMock('enemy', loot)
    room.addEnemy(skeleton)

    const rooms = new MockedRooms([room])
    const turnAllocator = new MockedTurnAllocator()
    const broadcaster = new MockedPlayerBroadcaster()
    const socket = new MockedSocket('player', 'room')
    const random = new MockedRandomizer({ diceResult: 6 })

    const event: AttackEvent = {
      enemyId: 'enemy',
      originCoords: [0, 0]
    }

    const handler = new AttackHandler(
      server,
      players,
      rooms,
      turnAllocator,
      broadcaster,
      loots,
      random
    )

    handler.handle('attack', socket, event)

    const updatedPlayer = players.find('player')
    const updatedRoom = rooms.find('room')
    const targetCoords = Coords.fromScalar([1, 1])

    expect(updatedPlayer).not.toBeNull()
    expect(updatedRoom).not.toBeNull()
    expect(updatedRoom!.getLoots()).toHaveLength(1)
    expect(updatedRoom!.getLoots()[0]).toStrictEqual(new LootableWeapon(loot.item, [0, 0]))
    expect(Coords.fromScalar(updatedPlayer!.coords).equals(targetCoords)).toBeTruthy()
    expect(updatedPlayer!.health).toBe(5)
    expect(server.roomEmittedEvents['room']?.includes('attacked')).toBeTruthy()
    expect(server.roomEmittedEvents['room']?.includes('enemies')).toBeTruthy()
    expect(server.roomEmittedEvents['room']?.includes('loots')).toBeTruthy()
    expect(broadcaster.broadcastedRooms.includes('room')).toBeFalsy()
    expect(turnAllocator.turnRoomAllocated.includes('room')).toBeTruthy()
    expect(updatedRoom!.getEnemies().length).toBe(0)
  })
})
