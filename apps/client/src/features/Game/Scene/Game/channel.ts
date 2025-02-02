import type { SocketChannel, AppSocket, UserPayload } from 'services/socket'
import { GameActions, playerTurn } from 'features/Game/slice'
import { eventChannel } from 'redux-saga'

const gameChannel: SocketChannel<GameActions> = (socket: AppSocket) => {
  return eventChannel(emitter => {
    const onPlayerTurnListener = (playerId: UserPayload['id']) => {
      emitter(playerTurn(playerId))
    }

    socket.on('playerTurn', onPlayerTurnListener)

    return () => {
      socket.off('playerTurn', onPlayerTurnListener)
    }
  })
}

export default gameChannel
