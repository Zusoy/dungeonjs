import { inject, injectable, registry } from 'tsyringe'
import type IEventHandler from 'IEventHandler'
import type { CreateRoomPayload, AppSocket, AppServer } from 'types'
import type ICollection from 'Netcode/Collection/ICollection'
import type ILogger from 'ILogger'
import type User from 'Netcode/User'
import Room from 'Netcode/Room'

@injectable()
@registry([{ token: 'handlers', useClass: CreateRoomHandler }])
export default class CreateRoomHandler implements IEventHandler<'createRoom'> {
  constructor(
    @inject('users') private readonly users: ICollection<User>,
    @inject('rooms') private readonly rooms: ICollection<Room>,
    @inject('server') private readonly server: AppServer,
    @inject('logger') private readonly logger: ILogger
  ) {
  }

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
    this.logger.info('Room created', room)
  }
}
