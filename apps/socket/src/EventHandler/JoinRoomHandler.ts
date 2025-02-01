import AbstractEventHandler from 'AbstractEventHandler'
import { JoinRoomPayload, AppSocket } from 'types'

export default class JoinRoomHandler extends AbstractEventHandler<'joinRoom'> {
  supports(event: "joinRoom", payload: [payload: JoinRoomPayload], _socket: AppSocket): boolean {
    const [joinPayload] = payload

    return event === 'joinRoom'
      && !!this.rooms.find(joinPayload.roomId)
  }

  handle(_event: "joinRoom", payload: [payload: JoinRoomPayload], socket: AppSocket): void {
    const [joinPayload] = payload
    const room = this.rooms.find(joinPayload.roomId)

    if (!room) {
      return
    }

    socket.join(joinPayload.roomId)
    socket.emit('joinedRoom', joinPayload.roomId)

    this.server.in(joinPayload.roomId).fetchSockets()
      .then(sockets => {
        const roomUsers = sockets
          .map(({ id }) => id)
          .map(id => this.users.find(id))
          .filter(u => !!u)
          .map(u => u.getRoomPayload(u.id === room.createdById))

        this.server.in(joinPayload.roomId).emit('players', roomUsers)
      })
  }
}
