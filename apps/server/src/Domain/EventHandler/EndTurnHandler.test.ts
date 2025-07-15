import 'reflect-metadata'
import type { EndTurnEvent } from 'Domain/Event/EndTurnEvent'
import { describe, test, expect } from 'vitest'
import { EndTurnHandler } from 'Domain/EventHandler/EndTurnHandler'
import { MockedPlayers } from 'Application/Repository/MockedPlayers'
import { MockedRooms } from 'Application/Repository/MockedRooms'
import { MockedTurnAllocator } from 'Application/Notification/MockedTurnAllocator'
import { MockedSocket } from 'Infra/Websocket/MockedSocket'
import { PlayerNotInRoomError } from 'Domain/Error/PlayerNotInRoomError'
import { ObjectNotFoundError } from 'Domain/Error/ObjectNotFoundError'
import { createPlayerMock } from 'test-utils'
import { Room } from 'Domain/Model/Room'

describe('EventHandler/EndTurn', () => {
  test('throws not authorized when not joined room', () => {
    const players = new MockedPlayers([])
    const rooms = new MockedRooms([])
    const turnAllocator = new MockedTurnAllocator()
    const event: EndTurnEvent = { timestamp: 120 }
    const socket = new MockedSocket('playerId', null)

    const handler = new EndTurnHandler(players, rooms, turnAllocator)
    expect(() => handler.handle('endTurn', socket, event)).toThrow(new PlayerNotInRoomError('playerId'))
  })

  test('throws when player not found', () => {
    const players = new MockedPlayers([])
    const rooms = new MockedRooms([])
    const turnAllocator = new MockedTurnAllocator()
    const event: EndTurnEvent = { timestamp: 120 }
    const socket = new MockedSocket('playerId', 'roomId')

    const handler = new EndTurnHandler(players, rooms, turnAllocator)
    expect(() => handler.handle('endTurn', socket, event)).toThrow(new ObjectNotFoundError('Player', 'playerId'))
  })

  test('throws when room not found', () => {
    const players = new MockedPlayers([ createPlayerMock('playerId', 'username', [0, 0]) ])
    const rooms = new MockedRooms([])
    const turnAllocator = new MockedTurnAllocator()
    const event: EndTurnEvent = { timestamp: 120 }
    const socket = new MockedSocket('playerId', 'roomId')

    const handler = new EndTurnHandler(players, rooms, turnAllocator)
    expect(() => handler.handle('endTurn', socket, event)).toThrow(new ObjectNotFoundError('Room', 'roomId'))
  })

  test('allocates next player turn', () => {
    const players = new MockedPlayers([ createPlayerMock('playerId', 'username', [0, 0]) ])
    const rooms = new MockedRooms([ new Room('roomId', 'playerId') ])
    const turnAllocator = new MockedTurnAllocator()
    const event: EndTurnEvent = { timestamp: 120 }
    const socket = new MockedSocket('playerId', 'roomId')

    const handler = new EndTurnHandler(players, rooms, turnAllocator)
    handler.handle('endTurn', socket, event)

    expect(turnAllocator.turnRoomAllocated.includes('roomId')).toBeTruthy()
  })
})
