import { inject, injectable, registry } from 'tsyringe'
import type IEventHandler from 'IEventHandler'
import type ICollection from 'Netcode/Collection/ICollection'
import type { LeaveRoomPayload, AppSocket, AppServer } from 'types'
import type ILogger from 'ILogger'
import Room from 'Netcode/Room'
import User from 'Netcode/User'

@injectable()
@registry([{ token: 'handlers', useClass: LeaveRoomHandler }])
export default class LeaveRoomHandler implements IEventHandler<'leaveRoom'> {
  constructor(
    @inject('rooms') private readonly rooms: ICollection<Room>,
    @inject('users') private readonly users: ICollection<User>,
    @inject('server') private readonly server: AppServer,
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

    this.server.in(leavePayload.roomId).fetchSockets()
      .then(sockets => {
        const roomUsers = sockets
          .map(({ id }) => id)
          .map(id => this.users.find(id))
          .filter(u => !!u)
          .map(u => u.getRoomPayload(u.id === room.createdById))

        this.server.in(leavePayload.roomId).emit('players', roomUsers)
      })

    this.logger.info('User leave room', socket.id, room.roomId)
  }
}
