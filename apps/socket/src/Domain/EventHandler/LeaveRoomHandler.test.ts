import 'reflect-metadata'
import { describe, test, expect } from 'vitest'
import { LeaveRoomHandler } from 'Domain/EventHandler/LeaveRoomHandler'
import { MockedRooms } from 'Application/Repository/MockedRooms'
import { MockedPlayerBroadcaster } from 'Application/Notification/MockedPlayerBroadcaster'
import { MockedServer } from 'Application/Websocket/MockedServer'
import { LeaveRoomEvent } from 'Domain/Event/LeaveRoomEvent'
import { MockedSocket } from 'Application/Websocket/MockedSocket'
import { Room } from 'Domain/Model/Room'
import type { ILogger } from 'Domain/ILogger'

describe('EventHandler/LeaveRoom', () => {
  test('throws error when room not found', () => {
    const rooms = new MockedRooms([])
    const broadcaster = new MockedPlayerBroadcaster()
    const server = new MockedServer()
    const socket = new MockedSocket('player_1', ['test'])
    const logger = { info: () => {}, error: () => {} } as ILogger

    const event: LeaveRoomEvent = {
      roomId: 'test'
    }

    const handler = new LeaveRoomHandler(rooms, server, broadcaster, logger)

    expect(() => handler.handle('leaveRoom', socket, event)).toThrow(/Room not found/)
  })

  test('throws error when leave not joined room', () => {
    const rooms = new MockedRooms([])
    const broadcaster = new MockedPlayerBroadcaster()
    const server = new MockedServer()
    const socket = new MockedSocket('player_1', ['test'])
    const logger = { info: () => {}, error: () => {} } as ILogger

    const event: LeaveRoomEvent = {
      roomId: 'other_room'
    }

    const handler = new LeaveRoomHandler(rooms, server, broadcaster, logger)

    expect(() => handler.handle('leaveRoom', socket, event)).toThrow(/Trying to leave not joined room/)
  })

  test('should kick all player', () => {
    const rooms = new MockedRooms([new Room('room_id', 'player_1')])
    const broadcaster = new MockedPlayerBroadcaster()
    const server = new MockedServer()
    const socket = new MockedSocket('player_1', ['room_id'])
    const logger = { info: () => {}, error: () => {} } as ILogger

    const event: LeaveRoomEvent = {
      roomId: 'room_id'
    }

    const handler = new LeaveRoomHandler(rooms, server, broadcaster, logger)
    handler.handle('leaveRoom', socket, event)

    expect(server.kickedRooms.includes('room_id')).toBeTruthy()
    expect(rooms.find('room_id')).toBeNull()
    expect(server.roomEmittedEvents['room_id'].includes('leftRoom')).toBeTruthy()
    expect(socket.rooms.includes('room_id')).toBeFalsy()
    expect(broadcaster.broadcastedRooms.includes('room_id')).toBeTruthy()
  })

  test('should leave the room without kicking', () => {
    const rooms = new MockedRooms([new Room('room_id', 'player_2')])
    const broadcaster = new MockedPlayerBroadcaster()
    const server = new MockedServer()
    const socket = new MockedSocket('player_1', ['room_id'])
    const logger = { info: () => {}, error: () => {} } as ILogger

    const event: LeaveRoomEvent = {
      roomId: 'room_id'
    }

    const handler = new LeaveRoomHandler(rooms, server, broadcaster, logger)
    handler.handle('leaveRoom', socket, event)

    expect(server.kickedRooms.includes('room_id')).toBeFalsy()
    expect(server.roomEmittedEvents['room_id']).toBeUndefined()
    expect(rooms.find('room_id')).not.toBeNull()
    expect(socket.rooms.includes('room_id')).toBeFalsy()
    expect(broadcaster.broadcastedRooms.includes('room_id')).toBeTruthy()
  })
})
