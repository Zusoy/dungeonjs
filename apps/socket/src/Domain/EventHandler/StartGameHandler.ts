import { inject, injectable, registry } from 'tsyringe'
import type { StartGameEvent } from 'Domain/Event/StartGameEvent'
import type { IEventHandler } from 'Domain/EventHandler/IEventHandler'
import type { ISocket } from 'Domain/ISocket'
import type { IRooms } from 'Domain/Repository/IRooms'
import type { IServer } from 'Domain/IServer'
import type { ILogger } from 'Domain/ILogger'

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

  handle(_channel: 'startGame', _socket: ISocket, event: StartGameEvent): void {
    const room = this.rooms.find(event.roomId)

    if (!room) {
      throw new Error(`Room not found for ID ${event.roomId}`)
    }

    this.server.emitInRoom('gameStarted', room, { roomId: room.roomId })
    this.server.fetchSocketIds(room)
      .then(ids => {
        const playerId = Array.from(ids)[0]
        this.server.emitInRoom('playerTurn', room, { playerId })
      })

    this.logger.info('Game starting', event.roomId)
  }
}
