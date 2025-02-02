import { CreateRoomPayload, AppSocket } from 'types'
import AbstractEventHandler from 'AbstractEventHandler'
import Room from 'Netcode/Room'

export default class CreateRoomHandler extends AbstractEventHandler<'createRoom'> {
  supports(event: "createRoom", _payload: [payload: CreateRoomPayload], _socket: AppSocket): boolean {
    return event === 'createRoom'
  }

  handle(_event: "createRoom", payload: [payload: CreateRoomPayload], socket: AppSocket): void {
    const [createPayload] = payload
    const user = this.users.find(socket.id)

    if (!user) {
      return
    }

    const room = new Room(createPayload.roomId, socket.id)
    this.rooms.add(room)

    socket.join(createPayload.roomId)
    socket.emit('joinedRoom', createPayload.roomId)

    this.server.in(createPayload.roomId).emit('players', [ user.getRoomPayload(true) ])
    this.server.emit('availableRooms', Array.from(this.rooms).map(({ roomId }) => roomId))
    console.log('Room created', room)
  }
}
