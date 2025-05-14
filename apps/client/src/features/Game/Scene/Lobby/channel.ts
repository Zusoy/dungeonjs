import { AppSocket, SocketChannel } from 'services/socket'
import { LobbyActions, receivedPlayers, ReceivedPlayersPayload, started } from 'features/Game/slice'
import { eventChannel } from 'redux-saga'

const lobbyChannel: SocketChannel<LobbyActions> = (socket: AppSocket) => {
  return eventChannel(emitter => {
    const onPlayersListener = (payload: ReceivedPlayersPayload) => {
      emitter(receivedPlayers(payload))
    }

    const onGameStartedListener = () => {
      emitter(started())
    }

    socket.on('players', onPlayersListener)
    socket.on('gameStarted', onGameStartedListener)

    return () => {
      socket.off('players', onPlayersListener)
      socket.off('gameStarted', onGameStartedListener)
    }
  })
}

export default lobbyChannel
