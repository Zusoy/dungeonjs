import 'reflect-metadata'
import { EndTurnEvent } from 'Domain/Event/EndTurnEvent'
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
  test('throws not authorized when not joined room', async () => {
    const players = new MockedPlayers([])
    const rooms = new MockedRooms([])
    const turnAllocator = new MockedTurnAllocator()
    const event = new EndTurnEvent(120)
    const socket = new MockedSocket('playerId', null)

    const handler = new EndTurnHandler(players, rooms, turnAllocator)
    await expect(handler.handle('endTurn', socket, event)).rejects.toThrow(new PlayerNotInRoomError('playerId'))
  })

  test('throws when player not found', async () => {
    const players = new MockedPlayers([])
    const rooms = new MockedRooms([])
    const turnAllocator = new MockedTurnAllocator()
    const event = new EndTurnEvent(120)
    const socket = new MockedSocket('playerId', 'roomId')

    const handler = new EndTurnHandler(players, rooms, turnAllocator)
    await expect(handler.handle('endTurn', socket, event)).rejects.toThrow(new ObjectNotFoundError('Player', 'playerId'))
  })

  test('throws when room not found', async () => {
    const players = new MockedPlayers([ createPlayerMock('playerId', 'username', [0, 0]) ])
    const rooms = new MockedRooms([])
    const turnAllocator = new MockedTurnAllocator()
    const event = new EndTurnEvent(120)
    const socket = new MockedSocket('playerId', 'roomId')

    const handler = new EndTurnHandler(players, rooms, turnAllocator)
    await expect(handler.handle('endTurn', socket, event)).rejects.toThrow(new ObjectNotFoundError('Room', 'roomId'))
  })

  test('allocates next player turn', async () => {
    const players = new MockedPlayers([ createPlayerMock('playerId', 'username', [0, 0]) ])
    const rooms = new MockedRooms([ new Room('roomId', 'playerId') ])
    const turnAllocator = new MockedTurnAllocator()
    const event = new EndTurnEvent(120)
    const socket = new MockedSocket('playerId', 'roomId')

    const handler = new EndTurnHandler(players, rooms, turnAllocator)
    await handler.handle('endTurn', socket, event)

    expect(turnAllocator.turnRoomAllocated.includes('roomId')).toBeTruthy()
  })
})
