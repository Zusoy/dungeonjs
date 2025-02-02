import AbstractEventHandler from 'AbstractEventHandler'
import { LeaveRoomPayload, AppSocket } from 'types'

export default class LeaveRoomHandler extends AbstractEventHandler<'leaveRoom'> {
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
      console.log('Room author leave, cleaned room', room.roomId)
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

    console.log('User leave room', socket.id, room.roomId)
  }
}
