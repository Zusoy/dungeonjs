import { inject, injectable, registry } from 'tsyringe'
import type IEventHandler from 'IEventHandler'
import type ICollection from 'Netcode/Collection/ICollection'
import type { LeaveRoomPayload, AppSocket, AppServer } from 'types'
import type ILogger from 'ILogger'
import Room from 'Netcode/Room'
import UserEmitter from 'Netcode/UserEmitter'

@injectable()
@registry([{ token: 'handlers', useClass: LeaveRoomHandler }])
export default class LeaveRoomHandler implements IEventHandler<'leaveRoom'> {
  constructor(
    @inject('rooms') private readonly rooms: ICollection<Room>,
    @inject('server') private readonly server: AppServer,
    @inject('emitter.user') private readonly userEmitter: UserEmitter,
    @inject('logger') private readonly logger: ILogger
  ) {
  }

  supports(event: 'leaveRoom', payload: [payload: LeaveRoomPayload], socket: AppSocket): boolean {
    const [leavePayload] = payload

    return event === 'leaveRoom'
      && socket.rooms.has(leavePayload.roomId)
  }

  handle(_event: 'leaveRoom', payload: [payload: LeaveRoomPayload], socket: AppSocket): void {
    const [leavePayload] = payload
    const room = this.rooms.find(leavePayload.roomId)

    if (!socket.rooms.has(leavePayload.roomId) || !room) {
      return
    }

    if (room.createdById === socket.id) {
      this.rooms.remove(room)
      this.server.in(leavePayload.roomId).emit('leftRoom', 'room_deleted')
      this.server.in(leavePayload.roomId).socketsLeave(leavePayload.roomId)

      this.server.emit('availableRooms', Array.from(this.rooms).map(({ roomId }) => roomId))
      this.logger.info('Room author leave, cleaned room', room.roomId)
    }

    socket.leave(leavePayload.roomId)
    socket.emit('leftRoom', 'user_left')

    this.userEmitter.broadcast(room)
    this.logger.info('User leave room', socket.id, room.roomId)
  }
}
