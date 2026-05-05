import { inject, injectable, registry } from 'tsyringe'
import { Room } from 'Domain/Model/Room'
import { ObjectNotFoundError } from 'Domain/Error/ObjectNotFoundError'
import type { CreateRoomEvent } from 'Domain/Event/CreateRoomEvent'
import type { IEventHandler } from 'Domain/EventHandler/IEventHandler'
import type { ISocket } from 'Domain/ISocket'
import type { IPlayers } from 'Domain/Repository/IPlayers'
import type { IRooms } from 'Domain/Repository/IRooms'
import type { IPlayerBroadcaster } from 'Domain/Notification/IPlayerBroadcaster'
import type { ILogger } from 'Domain/ILogger'
import { JoinedRoomEvent } from 'Domain/Event/JoinedRoomEvent'
import { BROADCASTER, HANDLERS, LOGGER, PLAYERS, ROOMS } from 'Domain/tokens'

@injectable()
@registry([{ token: HANDLERS, useClass: CreateRoomHandler }])
export class CreateRoomHandler implements IEventHandler<'createRoom'> {
  constructor(
    @inject(PLAYERS)
    private readonly players: IPlayers,
    @inject(ROOMS)
    private readonly rooms: IRooms,
    @inject(BROADCASTER)
    private readonly broadcaster: IPlayerBroadcaster,
    @inject(LOGGER)
    private readonly logger: ILogger
  ) { }

  supports(channel: 'createRoom', _socket: ISocket, _event: CreateRoomEvent): boolean {
    return channel === 'createRoom'
  }

  async handle(_channel: 'createRoom', socket: ISocket, event: CreateRoomEvent): Promise<void> {
    const user = await this.players.find(socket.id)

    if (!user) {
      throw new ObjectNotFoundError("Player", socket.id)
    }

    const room = new Room(event.roomId, socket.id)
    await this.rooms.add(room)

    const joinedRoomEvent = new JoinedRoomEvent(room.roomId)

    socket.join(room)
    socket.emit('joinedRoom', joinedRoomEvent)

    await this.broadcaster.broadcast(room)
    this.logger.info('Room created', room)
  }
}
