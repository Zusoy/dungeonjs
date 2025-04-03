import { inject, injectable, registry } from 'tsyringe'
import type IServer from 'IServer'
import type ISocket from 'ISocket'
import type { StartGamePayload } from 'types/payload'
import type IEventHandler from 'IEventHandler'
import type ICollection from 'Netcode/Collection/ICollection'
import type ILogger from 'ILogger'
import type Room from 'Netcode/Room'

@injectable()
@registry([{ token: 'handlers', useClass: StartGameHandler }])
export default class StartGameHandler implements IEventHandler<'startGame'> {
  constructor(
    @inject('rooms') private readonly rooms: ICollection<Room>,
    @inject('server') private readonly server: IServer,
    @inject('logger') private readonly logger: ILogger
  ) {
  }

  supports(event: 'startGame', payload: [payload: StartGamePayload], socket: ISocket): boolean {
    const [startPayload] = payload

    return event === 'startGame'
      && !!this.rooms.find(startPayload.roomId)
      && socket.rooms.includes(startPayload.roomId)
  }

  handle(_event: 'startGame', payload: [payload: StartGamePayload], _socket: ISocket): void {
    const [startPayload] = payload
    const room = this.rooms.find(startPayload.roomId)

    if (!room) {
      return
    }

    this.server.emitInRoom('gameStarted', room, startPayload.roomId)
    this.server.fetchSocketIds(room)
      .then(ids => {
        const firstTurn = Array.from(ids)[0]
        this.server.emitInRoom('playerTurn', room, firstTurn)
      })

    this.logger.info('Game starting', startPayload.roomId)
  }
}
