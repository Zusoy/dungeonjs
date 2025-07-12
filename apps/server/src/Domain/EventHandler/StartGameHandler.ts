import { inject, injectable, registry } from 'tsyringe'
import type { StartGameEvent } from 'Domain/Event/StartGameEvent'
import type { IEventHandler } from 'Domain/EventHandler/IEventHandler'
import type { ISocket } from 'Domain/ISocket'
import type { IRooms } from 'Domain/Repository/IRooms'
import type { IServer } from 'Domain/IServer'
import type { ILogger } from 'Domain/ILogger'
import { ObjectNotFoundError } from 'Domain/Error/ObjectNotFoundError'
import { PlayerNotInRoomError } from 'Domain/Error/PlayerNotInRoomError'

@injectable()
@registry([{ token: 'handlers', useClass: StartGameHandler }])
export class StartGameHandler implements IEventHandler<'startGame'> {
  constructor(
    @inject('rooms')
    private readonly rooms: IRooms,
    @inject('server')
    private readonly server: IServer,
    @inject('logger')
    private readonly logger: ILogger
  ) {}

  supports(channel: 'startGame', _socket: ISocket, _event: StartGameEvent): boolean {
    return channel === 'startGame'
  }

  async handle(_channel: 'startGame', socket: ISocket, event: StartGameEvent): Promise<void> {
    const roomId = socket.room

    if (!roomId) {
      throw new PlayerNotInRoomError(socket.id)
    }

    const room = this.rooms.find(event.roomId)

    if (!room) {
      throw new ObjectNotFoundError("Room", event.roomId)
    }

    this.server.emitInRoom('gameStarted', room, { roomId: room.roomId })
    const socketIds = await this.server.fetchSocketIds(room)

    const playerId = Array.from(socketIds)[0]
    this.server.emitInRoom('playerTurn', room, { playerId })

    this.logger.info('Game starting', event.roomId)
  }
}
