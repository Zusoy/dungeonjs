import { inject, injectable, registry } from 'tsyringe'
import { ObjectNotFoundError } from 'Domain/Error/ObjectNotFoundError'
import { PlayerNotInRoomError } from 'Domain/Error/PlayerNotInRoomError'
import type { EndTurnEvent } from 'Domain/Event/EndTurnEvent'
import type { IEventHandler } from 'Domain/EventHandler/IEventHandler'
import type { ISocket } from 'Domain/ISocket'
import type { IRooms } from 'Domain/Repository/IRooms'
import type { IPlayers } from 'Domain/Repository/IPlayers'
import type { ITurnAllocator } from 'Domain/Notification/ITurnAllocator'

@injectable()
@registry([{ token: 'handlers', useClass: EndTurnHandler }])
export class EndTurnHandler implements IEventHandler<'endTurn'> {
  constructor(
    @inject('players')
    private readonly players: IPlayers,
    @inject('rooms')
    private readonly rooms: IRooms,
    @inject('turn_allocator')
    private readonly turnAllocator: ITurnAllocator
  ) {}

  supports(channel: 'endTurn', _socket: ISocket, _event: EndTurnEvent): boolean {
    return channel === 'endTurn'
  }

  async handle(_channel: 'endTurn', socket: ISocket, _event: EndTurnEvent): Promise<void> {
    const player = this.players.find(socket.id)
    const roomId = socket.room

    if (!roomId) {
      throw new PlayerNotInRoomError(socket.id)
    }

    if (!player) {
      throw new ObjectNotFoundError('Player', socket.id)
    }

    const room = this.rooms.find(roomId)

    if (!room) {
      throw new ObjectNotFoundError('Room', roomId)
    }

    await this.turnAllocator.allocateNextTurn(room, player.id)
  }
}
