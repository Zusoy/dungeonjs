import 'reflect-metadata'
import { describe, test, expect } from 'vitest'
import { CreateRoomHandler } from 'Domain/EventHandler/CreateRoomHandler'
import { MockedPlayers } from 'Application/Repository/MockedPlayers'
import { MockedRooms } from 'Application/Repository/MockedRooms'
import { MockedPlayerBroadcaster } from 'Application/Notification/MockedPlayerBroadcaster'
import { ILogger } from 'Domain/ILogger'
import { MockedSocket } from 'Application/Websocket/MockedSocket'
import { CreateRoomEvent } from 'Domain/Event/CreateRoomEvent'
import { createPlayerMock } from 'test-utils'
import { ObjectNotFoundError } from 'Domain/Error/ObjectNotFoundError'

describe('EventHandler/CreateRoom', () => {
  test('should throws when user not found', () => {
    const players = new MockedPlayers([])
    const rooms = new MockedRooms([])
    const broadcaster = new MockedPlayerBroadcaster()
    const logger = {} as ILogger
    const socket = new MockedSocket("player_1", null)

    const event: CreateRoomEvent = {
      roomId: 'test'
    }

    const handler = new CreateRoomHandler(
      players,
      rooms,
      broadcaster,
      logger
    )

    expect(() => handler.handle('createRoom', socket, event)).toThrowError(new ObjectNotFoundError("Player", "player_1"))
  })

  test('should create the room and join it and broadcast players', () => {
    const players = new MockedPlayers([ createPlayerMock('player_1', 'test') ])
    const rooms = new MockedRooms([])
    const broadcaster = new MockedPlayerBroadcaster()
    const logger = { info: () => {}, error: () => {} } as ILogger
    const socket = new MockedSocket("player_1", null)

    const event: CreateRoomEvent = {
      roomId: 'test'
    }

    const handler = new CreateRoomHandler(
      players,
      rooms,
      broadcaster,
      logger
    )

    handler.handle('createRoom', socket, event)
    const room = rooms.find('test')

    expect(room).not.toBeNull()
    expect(room?.roomId).toBe('test')
    expect(socket.room).toBe('test')
    expect(broadcaster.broadcastedRooms.includes('test')).toBeTruthy()
  })
})
