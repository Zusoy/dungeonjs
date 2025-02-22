import { inject, injectable, registry } from 'tsyringe'
import type IEventHandler from 'IEventHandler'
import type ICollection from 'Netcode/Collection/ICollection'
import type { JoinRoomPayload, AppSocket } from 'types'
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
    this.userEmitter.broadcast(room)
  }
}
