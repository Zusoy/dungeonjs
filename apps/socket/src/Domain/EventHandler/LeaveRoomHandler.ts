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

@injectable()
@registry([{ token: 'handlers', useClass: LeaveRoomHandler }])
export class LeaveRoomHandler implements IEventHandler<'leaveRoom'> {
  constructor (
    @inject('rooms')
    private readonly rooms: IRooms,
    @inject('server')
    private readonly server: IServer,
    @inject('players.broadcaster')
    private readonly broadcaster: IPlayerBroadcaster,
    @inject('logger')
    private readonly logger: ILogger
  ) {}

  supports(channel: 'leaveRoom', _socket: ISocket, _event: LeaveRoomEvent): boolean {
    return channel === 'leaveRoom'
  }

  handle(_channel: 'leaveRoom', socket: ISocket, event: LeaveRoomEvent): void {
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
      this.server.emitInRoom('leftRoom', room, { reason: 'room_deleted' })

      this.logger.info('Room author leave, cleaned room', room.roomId)
    }

    socket.leave(room)
    socket.emit('leftRoom', { reason: 'user_left' })
    this.broadcaster.broadcast(room)
    this.logger.info('User leave room', socket.id, room.roomId)
  }
}
