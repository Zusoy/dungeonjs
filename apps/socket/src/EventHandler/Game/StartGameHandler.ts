import { inject, injectable, registry } from 'tsyringe'
import type { StartGamePayload, AppSocket, AppServer } from 'types'
import type IEventHandler from 'IEventHandler'
import type ICollection from 'Netcode/Collection/ICollection'
import type ILogger from 'ILogger'
import type Room from 'Netcode/Room'

@injectable()
@registry([{ token: 'handlers', useClass: StartGameHandler }])
export default class StartGameHandler implements IEventHandler<'startGame'> {
  constructor(
    @inject('rooms') private readonly rooms: ICollection<Room>,
    @inject('server') private readonly server: AppServer,
    @inject('logger') private readonly logger: ILogger
  ) {
  }

  supports(event: 'startGame', payload: [payload: StartGamePayload], socket: AppSocket): boolean {
    const [startPayload] = payload

    return event === 'startGame'
      && !!this.rooms.find(startPayload.roomId)
      && Array.from(socket.rooms).includes(startPayload.roomId)
  }

  handle(_event: 'startGame', payload: [payload: StartGamePayload], _socket: AppSocket): void {
    const [startPayload] = payload
    this.server.in(startPayload.roomId).emit('gameStarted', startPayload.roomId)

    this.server.in(startPayload.roomId).fetchSockets()
      .then(sockets => {
        const ids = sockets.map(({ id }) => id)
        this.server.in(startPayload.roomId).emit('playerTurn', ids[0])
      })

    this.logger.info('Game starting', startPayload.roomId)
  }
}
