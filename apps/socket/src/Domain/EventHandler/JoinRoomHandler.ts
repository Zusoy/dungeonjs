import { inject, injectable, registry } from 'tsyringe'
import type { JoinRoomEvent } from 'Domain/Event/JoinRoomEvent'
import type { IEventHandler } from 'Domain/EventHandler/IEventHandler'
import type { ISocket } from 'Domain/ISocket'
import type { IRooms } from 'Domain/Repository/IRooms'
import type { IPlayerBroadcaster } from 'Domain/Notification/IPlayerBroadcaster'
import { ObjectNotFoundError } from 'Domain/Error/ObjectNotFoundError'

@injectable()
@registry([{ token: 'handlers', useClass: JoinRoomHandler }])
export class JoinRoomHandler implements IEventHandler<'joinRoom'> {
  constructor (
    @inject('rooms')
    private readonly rooms: IRooms,
    @inject('players.broadcaster')
    private readonly broadcaster: IPlayerBroadcaster
  ) {}

  supports(channel: 'joinRoom', _socket: ISocket, _event: JoinRoomEvent): boolean {
    return channel === 'joinRoom'
  }

  handle(_channel: 'joinRoom', socket: ISocket, event: JoinRoomEvent): void {
    const room = this.rooms.find(event.roomId)

    if (!room) {
      socket.emit('failedToJoinRoom', { roomId: event.roomId, code: 'room_not_found' })
      throw new ObjectNotFoundError("Room", event.roomId)
    }

    socket.join(room)
    socket.emit('joinedRoom', { roomId: event.roomId })
    this.broadcaster.broadcast(room)
  }
}
