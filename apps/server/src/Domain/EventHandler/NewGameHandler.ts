import { inject, injectable, registry } from 'tsyringe'
import type { IRooms } from 'Domain/Repository/IRooms'
import type { IEventHandler } from 'Domain/EventHandler/IEventHandler'
import type { NewGameEvent } from 'Domain/Event/NewGameEvent'
import type { ISocket } from 'Domain/ISocket'
import type { ITurnAllocator } from 'Domain/Notification/ITurnAllocator'
import type { IPlayers } from 'Domain/Repository/IPlayers'
import type { IServer } from 'Domain/IServer'
import { PlayerNotInRoomError } from 'Domain/Error/PlayerNotInRoomError'
import { ObjectNotFoundError } from 'Domain/Error/ObjectNotFoundError'
import { HANDLERS, PLAYERS, ROOMS, SERVER, TURN_ALLOCATOR } from 'Domain/tokens'

@injectable()
@registry([{ token: HANDLERS, useClass: NewGameHandler }])
export class NewGameHandler implements IEventHandler<'newGame'> {
  constructor(
    @inject(ROOMS)
    private readonly rooms: IRooms,
    @inject(PLAYERS)
    private readonly players: IPlayers,
    @inject(SERVER)
    private readonly server: IServer,
    @inject(TURN_ALLOCATOR)
    private readonly turnAllocator: ITurnAllocator
  ) {}

  public supports(channel: 'newGame', _socket: ISocket, _event: NewGameEvent): boolean {
    return channel === 'newGame'
  }

  public async handle(_channel: 'newGame', socket: ISocket, _event: NewGameEvent): Promise<void> {
    if (!socket.room) {
      throw new PlayerNotInRoomError(socket.id)
    }

    const room = await this.rooms.find(socket.room)

    if (!room) {
      throw new ObjectNotFoundError('Room', socket.room)
    }

    const ids = await this.server.fetchSocketIds(room)
    const players = (await Promise.all(Array.from(ids).map(id => this.players.find(id)))).filter(player => !!player)

    players.forEach(player => {
      player.reset()
      this.players.update(player)
    })

    room.reset()
    this.rooms.update(room)

    this.server.emitInRoom('gameRestarted', room)
    this.turnAllocator.allocateTurn(room, Array.from(ids)[0])
  }
}
