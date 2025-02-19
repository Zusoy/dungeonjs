import { inject, injectable, registry } from 'tsyringe'
import type IEventHandler from 'IEventHandler'
import type ICollection from 'Netcode/Collection/ICollection'
import type { JoinRoomPayload, AppSocket, AppServer } from 'types'
import Room from 'Netcode/Room'
import User from 'Netcode/User'

@injectable()
@registry([{ token: 'handlers', useClass: JoinRoomHandler }])
export default class JoinRoomHandler implements IEventHandler<'joinRoom'> {
  constructor(
    @inject('rooms') private readonly rooms: ICollection<Room>,
    @inject('users') private readonly users: ICollection<User>,
    @inject('server') private readonly server: AppServer
  ) {
  }

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
