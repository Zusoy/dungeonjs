import { inject, injectable, registry } from 'tsyringe'
import type { JoinRoomEvent } from 'Domain/Event/JoinRoomEvent'
import type { IEventHandler } from 'Domain/EventHandler/IEventHandler'
import type { ISocket } from 'Domain/ISocket'
import type { IRooms } from 'Domain/Repository/IRooms'
import type { IPlayerBroadcaster } from 'Domain/Notification/IPlayerBroadcaster'
import type { IServer } from 'Domain/IServer'
import { ObjectNotFoundError } from 'Domain/Error/ObjectNotFoundError'
import { OperationDeniedError } from 'Domain/Error/OperationDeniedError'
import { FailedToJoinRoomEvent } from 'Domain/Event/FailedToJoinRoomEvent'
import { JoinedRoomEvent } from 'Domain/Event/JoinedRoomEvent'

@injectable()
@registry([{ token: 'handlers', useClass: JoinRoomHandler }])
export class JoinRoomHandler implements IEventHandler<'joinRoom'> {
  constructor (
    @inject('rooms')
    private readonly rooms: IRooms,
    @inject('players.broadcaster')
    private readonly broadcaster: IPlayerBroadcaster,
    @inject('server')
    private readonly server: IServer,
    @inject('room.maxplayer')
    private readonly maxPlayer: number
  ) {}

  supports(channel: 'joinRoom', _socket: ISocket, _event: JoinRoomEvent): boolean {
    return channel === 'joinRoom'
  }

  async handle(_channel: 'joinRoom', socket: ISocket, event: JoinRoomEvent): Promise<void> {
    const room = this.rooms.find(event.roomId)

    if (!room) {
      const failedEvent = new FailedToJoinRoomEvent(event.roomId, 'room_not_found')
      socket.emit('failedToJoinRoom', failedEvent)
      throw new ObjectNotFoundError("Room", event.roomId)
    }

    const currentPlayers = await this.server.fetchSocketIds(room)

    if (Array.from(currentPlayers).length >= this.maxPlayer) {
      const failedEvent = new FailedToJoinRoomEvent(room.roomId, 'max_players')
      socket.emit('failedToJoinRoom', failedEvent)
      throw new OperationDeniedError()
    }

    const joinedEvent = new JoinedRoomEvent(event.roomId)

    socket.join(room)
    socket.emit('joinedRoom', joinedEvent)
    this.broadcaster.broadcast(room)
  }
}
