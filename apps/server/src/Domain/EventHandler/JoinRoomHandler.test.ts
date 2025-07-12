import 'reflect-metadata'
import { describe, test, expect } from 'vitest'
import { JoinRoomHandler } from 'Domain/EventHandler/JoinRoomHandler'
import { MockedRooms } from 'Application/Repository/MockedRooms'
import { MockedPlayerBroadcaster } from 'Application/Notification/MockedPlayerBroadcaster'
import { JoinRoomEvent } from 'Domain/Event/JoinRoomEvent'
import { MockedSocket } from 'Infra/Websocket/MockedSocket'
import { MockedServer } from 'Infra/Websocket/MockedServer'
import { Room } from 'Domain/Model/Room'
import { ObjectNotFoundError } from 'Domain/Error/ObjectNotFoundError'
import { OperationDeniedError } from 'Domain/Error/OperationDeniedError'

describe('EventHandler/JoinRoom', () => {
  test('throws when room not found and emit failed to join event', async () => {
    const rooms = new MockedRooms([])
    const broadcaster = new MockedPlayerBroadcaster()
    const socket = new MockedSocket('player_1', null)
    const server = new MockedServer([])

    const event: JoinRoomEvent = {
      roomId: 'test'
    }

    const handler = new JoinRoomHandler(rooms, broadcaster, server, 5)
    await expect(handler.handle('joinRoom', socket, event)).rejects.toThrow(new ObjectNotFoundError("Room", "test"))
    expect(socket.emittedEvents.includes('failedToJoinRoom')).toBeTruthy()
    expect(broadcaster.broadcastedRooms.includes('test')).toBeFalsy()
  })

  test('throws when room has max players count and emit failed to join event', async () => {
    const rooms = new MockedRooms([ new Room('test', 'authorId') ])
    const broadcaster = new MockedPlayerBroadcaster()
    const socket = new MockedSocket('player_1', null)
    const server = new MockedServer(['player_1', 'player_2'])

    const event: JoinRoomEvent = {
      roomId: 'test'
    }

    const handler = new JoinRoomHandler(rooms, broadcaster, server, 2)
    await expect(handler.handle('joinRoom', socket, event)).rejects.toThrow(OperationDeniedError)
    expect(socket.emittedEvents.includes('failedToJoinRoom')).toBeTruthy()
    expect(socket.emittedEvents.includes('joinedRoom')).toBeFalsy()
    expect(broadcaster.broadcastedRooms.includes('test')).toBeFalsy()
  })

  test('should join the room and emit joinedRoom event with broadcast players', async () => {
    const rooms = new MockedRooms([ new Room('test', 'authorId') ])
    const broadcaster = new MockedPlayerBroadcaster()
    const socket = new MockedSocket('player_1', null)
    const server = new MockedServer([])

    const event: JoinRoomEvent = {
      roomId: 'test'
    }

    const handler = new JoinRoomHandler(rooms, broadcaster, server, 5)
    await handler.handle('joinRoom', socket, event)

    expect(socket.room).toBe('test')
    expect(socket.emittedEvents.includes('joinedRoom')).toBeTruthy()
    expect(broadcaster.broadcastedRooms.includes('test')).toBeTruthy()
  })
})
