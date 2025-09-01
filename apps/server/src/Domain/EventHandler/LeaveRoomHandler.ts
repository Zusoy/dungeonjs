import { inject, injectable, registry } from 'tsyringe'
import type { LeaveRoomEvent } from 'Domain/Event/LeaveRoomEvent'
import type { IEventHandler } from 'Domain/EventHandler/IEventHandler'
import type { ISocket } from 'Domain/ISocket'
import type { IRooms } from 'Domain/Repository/IRooms'
import type { IServer } from 'Domain/IServer'
import type { ILogger } from 'Domain/ILogger'
import type { IPlayerBroadcaster } from 'Domain/Notification/IPlayerBroadcaster'
import { OperationDeniedError } from 'Domain/Error/OperationDeniedError'
import { ObjectNotFoundError } from 'Domain/Error/ObjectNotFoundError'
import { LeftRoomEvent } from 'Domain/Event/LeftRoomEvent'
import { BROADCASTER, HANDLERS, LOGGER, ROOMS, SERVER } from 'Domain/tokens'

@injectable()
@registry([{ token: HANDLERS, useClass: LeaveRoomHandler }])
export class LeaveRoomHandler implements IEventHandler<'leaveRoom'> {
  constructor (
    @inject(ROOMS)
    private readonly rooms: IRooms,
    @inject(SERVER)
    private readonly server: IServer,
    @inject(BROADCASTER)
    private readonly broadcaster: IPlayerBroadcaster,
    @inject(LOGGER)
    private readonly logger: ILogger
  ) {}

  supports(channel: 'leaveRoom', _socket: ISocket, _event: LeaveRoomEvent): boolean {
    return channel === 'leaveRoom'
  }

  async handle(_channel: 'leaveRoom', socket: ISocket, event: LeaveRoomEvent): Promise<void> {
    const room = this.rooms.find(event.roomId)

    if (socket.room !== event.roomId) {
      throw new OperationDeniedError()
    }

    if (!room) {
      throw new ObjectNotFoundError("Room", event.roomId)
    }

    if (room.createdById === socket.id) {
      this.rooms.remove(room)

      this.server.kickAll(room)
      this.server.emitInRoom('leftRoom', room, new LeftRoomEvent('room_deleted'))

      this.logger.info('Room author leave, cleaned room', room.roomId)
    }

    socket.leave(room)
    socket.emit('leftRoom', new LeftRoomEvent('user_left'))
    this.broadcaster.broadcast(room)
    this.logger.info('User leave room', socket.id, room.roomId)
  }
}
