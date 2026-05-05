import { inject, injectable, registry } from 'tsyringe'
import type { StartGameEvent } from 'Domain/Event/StartGameEvent'
import type { IEventHandler } from 'Domain/EventHandler/IEventHandler'
import type { ISocket } from 'Domain/ISocket'
import type { IRooms } from 'Domain/Repository/IRooms'
import type { IServer } from 'Domain/IServer'
import type { ILogger } from 'Domain/ILogger'
import { ObjectNotFoundError } from 'Domain/Error/ObjectNotFoundError'
import { PlayerNotInRoomError } from 'Domain/Error/PlayerNotInRoomError'
import { GameStartedEvent } from 'Domain/Event/GameStartedEvent'
import { PlayerTurnEvent } from 'Domain/Event/PlayerTurnEvent'
import { HANDLERS, LOGGER, ROOMS, SERVER } from 'Domain/tokens'

@injectable()
@registry([{ token: HANDLERS, useClass: StartGameHandler }])
export class StartGameHandler implements IEventHandler<'startGame'> {
  constructor(
    @inject(ROOMS)
    private readonly rooms: IRooms,
    @inject(SERVER)
    private readonly server: IServer,
    @inject(LOGGER)
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

    const room = await this.rooms.find(event.roomId)

    if (!room) {
      throw new ObjectNotFoundError("Room", event.roomId)
    }

    this.server.emitInRoom('gameStarted', room, new GameStartedEvent(room.roomId))
    const socketIds = await this.server.fetchSocketIds(room)

    const playerId = Array.from(socketIds)[0]
    this.server.emitInRoom('playerTurn', room, new PlayerTurnEvent(playerId))

    this.logger.info('Game starting', event.roomId)
  }
}
