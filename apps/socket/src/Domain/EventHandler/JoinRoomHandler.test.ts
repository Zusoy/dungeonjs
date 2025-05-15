import 'reflect-metadata'
import { describe, test, expect } from 'vitest'
import { JoinRoomHandler } from 'Domain/EventHandler/JoinRoomHandler'
import { MockedRooms } from 'Application/Repository/MockedRooms'
import { MockedPlayerBroadcaster } from 'Application/Notification/MockedPlayerBroadcaster'
import { JoinRoomEvent } from 'Domain/Event/JoinRoomEvent'
import { MockedSocket } from 'Application/Websocket/MockedSocket'
import { Room } from 'Domain/Model/Room'
import { ObjectNotFoundError } from 'Domain/Error/ObjectNotFoundError'

describe('EventHandler/JoinRoom', () => {
  test('should throws when room not found and emit failed to join event', () => {
    const rooms = new MockedRooms([])
    const broadcaster = new MockedPlayerBroadcaster()
    const socket = new MockedSocket('player_1', null)

    const event: JoinRoomEvent = {
      roomId: 'test'
    }

    const handler = new JoinRoomHandler(rooms, broadcaster)
    expect(() => handler.handle('joinRoom', socket, event)).toThrow(ObjectNotFoundError)
    expect(socket.emittedEvents.includes('failedToJoinRoom')).toBeTruthy()
    expect(broadcaster.broadcastedRooms.includes('test')).toBeFalsy()
  })

  test('should join the room and emit joinedRoom event with broadcast players', () => {
    const rooms = new MockedRooms([ new Room('test', 'authorId') ])
    const broadcaster = new MockedPlayerBroadcaster()
    const socket = new MockedSocket('player_1', null)

    const event: JoinRoomEvent = {
      roomId: 'test'
    }

    const handler = new JoinRoomHandler(rooms, broadcaster)
    handler.handle('joinRoom', socket, event)

    expect(socket.room).toBe('test')
    expect(socket.emittedEvents.includes('joinedRoom')).toBeTruthy()
    expect(broadcaster.broadcastedRooms.includes('test')).toBeTruthy()
  })
})
