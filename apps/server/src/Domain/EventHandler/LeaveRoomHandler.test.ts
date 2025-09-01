import 'reflect-metadata'
import { describe, test, expect } from 'vitest'
import { LeaveRoomHandler } from 'Domain/EventHandler/LeaveRoomHandler'
import { MockedRooms } from 'Application/Repository/MockedRooms'
import { MockedPlayerBroadcaster } from 'Application/Notification/MockedPlayerBroadcaster'
import { MockedServer } from 'Infra/Websocket/MockedServer'
import { MockedSocket } from 'Infra/Websocket/MockedSocket'
import { LeaveRoomEvent } from 'Domain/Event/LeaveRoomEvent'
import { Room } from 'Domain/Model/Room'
import type { ILogger } from 'Domain/ILogger'
import { ObjectNotFoundError } from 'Domain/Error/ObjectNotFoundError'
import { OperationDeniedError } from 'Domain/Error/OperationDeniedError'

describe('EventHandler/LeaveRoom', () => {
  test('throws error when room not found', async () => {
    const rooms = new MockedRooms([])
    const broadcaster = new MockedPlayerBroadcaster()
    const server = new MockedServer()
    const socket = new MockedSocket('player_1', 'test')
    const logger = { info: () => {}, error: () => {} } as ILogger

    const event = new LeaveRoomEvent('test')

    const handler = new LeaveRoomHandler(rooms, server, broadcaster, logger)
    await expect(handler.handle('leaveRoom', socket, event)).rejects.toThrow(new ObjectNotFoundError('Room', 'test'))
  })

  test('throws error when trying to leave not joined room', async () => {
    const rooms = new MockedRooms([])
    const broadcaster = new MockedPlayerBroadcaster()
    const server = new MockedServer()
    const socket = new MockedSocket('player_1', 'test')
    const logger = { info: () => {}, error: () => {} } as ILogger

    const event = new LeaveRoomEvent('other_room_name')

    const handler = new LeaveRoomHandler(rooms, server, broadcaster, logger)
    await expect(handler.handle('leaveRoom', socket, event)).rejects.toThrow(OperationDeniedError)
  })

  test('should kick all player when is room creator', async () => {
    const rooms = new MockedRooms([new Room('room_id', 'player_1')])
    const broadcaster = new MockedPlayerBroadcaster()
    const server = new MockedServer()
    const socket = new MockedSocket('player_1', 'room_id')
    const logger = { info: () => {}, error: () => {} } as ILogger

    const event = new LeaveRoomEvent('room_id')

    const handler = new LeaveRoomHandler(rooms, server, broadcaster, logger)
    await handler.handle('leaveRoom', socket, event)

    expect(server.kickedRooms.includes('room_id')).toBeTruthy()
    expect(rooms.find('room_id')).toBeNull()
    expect(server.roomEmittedEvents['room_id'].includes('leftRoom')).toBeTruthy()
    expect(socket.room).toBeNull()
    expect(broadcaster.broadcastedRooms.includes('room_id')).toBeTruthy()
  })

  test('should leave the room without kicking', async () => {
    const rooms = new MockedRooms([new Room('room_id', 'player_2')])
    const broadcaster = new MockedPlayerBroadcaster()
    const server = new MockedServer()
    const socket = new MockedSocket('player_1', 'room_id')
    const logger = { info: () => {}, error: () => {} } as ILogger

    const event = new LeaveRoomEvent('room_id')

    const handler = new LeaveRoomHandler(rooms, server, broadcaster, logger)
    await handler.handle('leaveRoom', socket, event)

    expect(server.kickedRooms.includes('room_id')).toBeFalsy()
    expect(server.roomEmittedEvents['room_id']).toBeUndefined()
    expect(rooms.find('room_id')).not.toBeNull()
    expect(socket.room).toBeNull()
    expect(broadcaster.broadcastedRooms.includes('room_id')).toBeTruthy()
  })
})
