import { inject, injectable, registry } from 'tsyringe'
import { Room } from 'Domain/Model/Room'
import type { CreateRoomEvent } from 'Domain/Event/CreateRoomEvent'
import type { IEventHandler } from 'Domain/EventHandler/IEventHandler'
import type { ISocket } from 'Domain/ISocket'
import type { IPlayers } from 'Domain/Repository/IPlayers'
import type { IRooms } from 'Domain/Repository/IRooms'
import type { IPlayerBroadcaster } from 'Domain/Notification/IPlayerBroadcaster'
import type { ILogger } from 'Domain/ILogger'
import { ObjectNotFoundError } from 'Domain/Error/ObjectNotFoundError'

@injectable()
@registry([{ token: 'handlers', useClass: CreateRoomHandler }])
export class CreateRoomHandler implements IEventHandler<'createRoom'> {
  constructor(
    @inject('players')
    private readonly players: IPlayers,
    @inject('rooms')
    private readonly rooms: IRooms,
    @inject('players.broadcaster')
    private readonly broadcaster: IPlayerBroadcaster,
    @inject('logger')
    private readonly logger: ILogger
  ) { }

  supports(channel: 'createRoom', _socket: ISocket, _event: CreateRoomEvent): boolean {
    return channel === 'createRoom'
  }

  handle(_channel: 'createRoom', socket: ISocket, event: CreateRoomEvent): void {
    const user = this.players.find(socket.id)

    if (!user) {
      throw new ObjectNotFoundError("Player", socket.id)
    }

    const room = new Room(event.roomId, socket.id)
    this.rooms.add(room)

    socket.join(room)
    socket.emit('joinedRoom', { roomId: room.roomId })

    this.broadcaster.broadcast(room)
    this.logger.info('Room created', room)
  }
}
