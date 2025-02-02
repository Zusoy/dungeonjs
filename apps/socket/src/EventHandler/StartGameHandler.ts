import AbstractEventHandler from 'AbstractEventHandler'
import { StartGamePayload, AppSocket } from 'types'

export default class StartGameHandler extends AbstractEventHandler<'startGame'> {
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
        const randomIndex = Math.floor(Math.random() * ids.length)

        this.server.emit('playerTurn', ids[randomIndex])
      })

    console.log('Game starting', startPayload.roomId)
  }
}
