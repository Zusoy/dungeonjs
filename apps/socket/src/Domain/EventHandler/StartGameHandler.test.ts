import 'reflect-metadata'
import { describe, test, expect } from 'vitest'
import { StartGameHandler } from 'Domain/EventHandler/StartGameHandler'
import { MockedRooms } from 'Application/Repository/MockedRooms'
import { MockedServer } from 'Application/Websocket/MockedServer'
import type { ILogger } from 'Domain/ILogger'
import { MockedSocket } from 'Application/Websocket/MockedSocket'
import { StartGameEvent } from 'Domain/Event/StartGameEvent'
import { Room } from 'Domain/Model/Room'
import { OperationDeniedError } from 'Domain/Error/OperationDeniedError'
import { ObjectNotFoundError } from 'Domain/Error/ObjectNotFoundError'

describe('EventHandler/StartGame', () => {
  test('not authorized when not joined room', async () => {
    const rooms = new MockedRooms([])
    const server = new MockedServer(['player_1', 'player_2', 'player_3'])
    const socket = new MockedSocket('player_id', null)
    const logger = { info: () => {}, error: () => {} } as ILogger

    const event: StartGameEvent = {
      roomId: 'game'
    }

    const handler = new StartGameHandler(rooms, server, logger)
    await expect(handler.handle('startGame', socket, event)).rejects.toThrow(OperationDeniedError)
  })

  test('throws when room not found', async () => {
    const rooms = new MockedRooms([])
    const server = new MockedServer(['player_1', 'player_2', 'player_3'])
    const socket = new MockedSocket('player_id', 'game')
    const logger = { info: () => {}, error: () => {} } as ILogger

    const event: StartGameEvent = {
      roomId: 'game'
    }

    const handler = new StartGameHandler(rooms, server, logger)
    await expect(handler.handle('startGame', socket, event)).rejects.toThrow(new ObjectNotFoundError("Room", "game"))
  })

  test('should start game and allocate first player turn', async () => {
    const rooms = new MockedRooms([new Room('game', 'player_1')])
    const server = new MockedServer(['player_1', 'player_2', 'player_3'])
    const socket = new MockedSocket('player_1', 'game')
    const logger = { info: () => {}, error: () => {} } as ILogger

    const event: StartGameEvent = {
      roomId: 'game'
    }

    const handler = new StartGameHandler(rooms, server, logger)
    await handler.handle('startGame', socket, event)

    expect(server.roomEmittedEvents['game']?.includes('gameStarted')).toBeTruthy()
    expect(server.roomEmittedEvents['game']?.includes('playerTurn')).toBeTruthy()
  })
})
