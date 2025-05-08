import { inject, injectable, registry } from 'tsyringe'
import type IEventHandler from 'IEventHandler'
import type ICollection from 'Netcode/Collection/ICollection'
import type IServer from 'IServer'
import type ISocket from 'ISocket'
import type { LeaveRoomPayload } from 'types/payload'
import type ILogger from 'ILogger'
import Room from 'Netcode/Room'
import UserEmitter from 'Netcode/UserEmitter'

@injectable()
@registry([{ token: 'handlers', useClass: LeaveRoomHandler }])
export default class LeaveRoomHandler implements IEventHandler<'leaveRoom'> {
  constructor(
    @inject('rooms') private readonly rooms: ICollection<Room>,
    @inject('server') private readonly server: IServer,
    @inject('emitter.user') private readonly userEmitter: UserEmitter,
    @inject('logger') private readonly logger: ILogger
  ) {
  }

  supports(event: 'leaveRoom', payload: [payload: LeaveRoomPayload], socket: ISocket): boolean {
    const [leavePayload] = payload

    return event === 'leaveRoom'
      && socket.rooms.includes(leavePayload.roomId)
  }

  handle(_event: 'leaveRoom', payload: [payload: LeaveRoomPayload], socket: ISocket): void {
    const [leavePayload] = payload
    const room = this.rooms.find(leavePayload.roomId)

    if (!socket.rooms.includes(leavePayload.roomId) || !room) {
      return
    }

    if (room.createdById === socket.id) {
      this.rooms.remove(room)

      this.server.kick(room)
      this.server.emitInRoom('leftRoom', room, 'room_deleted')

      this.logger.info('Room author leave, cleaned room', room.roomId)
    }

    socket.leave(room)
    socket.emit('leftRoom', 'user_left')

    this.userEmitter.broadcast(room)
    this.logger.info('User leave room', socket.id, room.roomId)
  }
}
