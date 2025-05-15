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
import { createPlayerMock } from 'test-utils'
import { OperationDeniedError } from 'Domain/Error/OperationDeniedError'
import { MinionSkeleton } from 'Domain/Model/Skeleton'
import { MockedRandomizer } from 'Application/RNG/MockedRandomizer'
import { Player } from 'Domain/Model/Player'
import { Coords } from 'Domain/Geometry/Coords'

describe('EventHandler/Attack', () => {
  test('throws when player not found', () => {
    const server = new MockedServer()
    const players = new MockedPlayers([])
    const rooms = new MockedRooms([])
    const turnAllocator = new MockedTurnAllocator()
    const broadcaster = new MockedPlayerBroadcaster()
    const socket = new MockedSocket('player', 'room')
    const random = new MockedRandomizer()

    const event: AttackEvent = {
      enemyId: 'enemy',
      originCoords: [0, 0]
    }

    const handler = new AttackHandler(server, players, rooms, turnAllocator, broadcaster, random)
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

    const event: AttackEvent = {
      enemyId: 'enemy',
      originCoords: [0, 0]
    }

    const handler = new AttackHandler(server, players, rooms, turnAllocator, broadcaster, random)
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

    const event: AttackEvent = {
      enemyId: 'enemy',
      originCoords: [0, 0]
    }

    const handler = new AttackHandler(server, players, rooms, turnAllocator, broadcaster, random)
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

    const event: AttackEvent = {
      enemyId: 'enemy',
      originCoords: [0, 0]
    }

    const handler = new AttackHandler(server, players, rooms, turnAllocator, broadcaster, random)
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

    const players = new MockedPlayers([player])
    const room = new Room('room', 'player')
    room.addEnemy(new MinionSkeleton('enemy', [0, 0]))

    const rooms = new MockedRooms([room])
    const turnAllocator = new MockedTurnAllocator()
    const broadcaster = new MockedPlayerBroadcaster()
    const socket = new MockedSocket('player', 'room')
    const random = new MockedRandomizer({ diceResult: 1 })

    const event: AttackEvent = {
      enemyId: 'enemy',
      originCoords: [0, 0]
    }

    const handler = new AttackHandler(server, players, rooms, turnAllocator, broadcaster, random)
    handler.handle('attack', socket, event)

    const updatedPlayer = players.find('player')
    const targetCoords = Coords.fromScalar([0, 0])

    expect(updatedPlayer).not.toBeNull()
    expect(Coords.fromScalar(updatedPlayer!.coords).equals(targetCoords)).toBeTruthy()
    expect(updatedPlayer!.health).toBe(4)
    expect(server.roomEmittedEvents['room']?.includes('attacked')).toBeTruthy()
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
    const room = new Room('room', 'player')
    room.addEnemy(new MinionSkeleton('enemy', [0, 0]))

    const rooms = new MockedRooms([room])
    const turnAllocator = new MockedTurnAllocator()
    const broadcaster = new MockedPlayerBroadcaster()
    const socket = new MockedSocket('player', 'room')
    const random = new MockedRandomizer({ diceResult: 6 })

    const event: AttackEvent = {
      enemyId: 'enemy',
      originCoords: [0, 0]
    }

    const handler = new AttackHandler(server, players, rooms, turnAllocator, broadcaster, random)
    handler.handle('attack', socket, event)

    const updatedPlayer = players.find('player')
    const updatedRoom = rooms.find('room')
    const targetCoords = Coords.fromScalar([1, 1])

    expect(updatedPlayer).not.toBeNull()
    expect(updatedRoom).not.toBeNull()
    expect(Coords.fromScalar(updatedPlayer!.coords).equals(targetCoords)).toBeTruthy()
    expect(updatedPlayer!.health).toBe(5)
    expect(server.roomEmittedEvents['room']?.includes('attacked')).toBeTruthy()
    expect(server.roomEmittedEvents['room']?.includes('enemies')).toBeTruthy()
    expect(broadcaster.broadcastedRooms.includes('room')).toBeFalsy()
    expect(turnAllocator.turnRoomAllocated.includes('room')).toBeTruthy()
    expect(updatedRoom!.getEnemies().length).toBe(0)
  })
})
