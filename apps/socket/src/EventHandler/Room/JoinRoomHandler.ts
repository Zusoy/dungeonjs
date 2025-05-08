import { inject, injectable, registry } from 'tsyringe'
import type IEventHandler from 'IEventHandler'
import type ICollection from 'Netcode/Collection/ICollection'
import type ISocket from 'ISocket'
import type { JoinRoomPayload } from 'types/payload'
import Room from 'Netcode/Room'
import UserEmitter from 'Netcode/UserEmitter'

@injectable()
@registry([{ token: 'handlers', useClass: JoinRoomHandler }])
export default class JoinRoomHandler implements IEventHandler<'joinRoom'> {
  constructor(
    @inject('rooms') private readonly rooms: ICollection<Room>,
    @inject('emitter.user') private readonly userEmitter: UserEmitter,
  ) {
  }

  supports(event: "joinRoom", _payload: [payload: JoinRoomPayload], _socket: ISocket): boolean {
    return event === 'joinRoom'
  }

  handle(_event: "joinRoom", payload: [payload: JoinRoomPayload], socket: ISocket): void {
    const [joinPayload] = payload
    const room = this.rooms.find(joinPayload.roomId)

    if (!room) {
      socket.emit('failedToJoinRoom', { roomId: joinPayload.roomId, code: 'room_not_found' })
      return
    }

    socket.join(room)
    socket.emit('joinedRoom', joinPayload.roomId)
    this.userEmitter.broadcast(room)
  }
}
