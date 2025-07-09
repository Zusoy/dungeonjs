import { AppSocket, SocketChannel } from 'services/socket'
import { receivedPlayers, gameStarted } from 'features/Lobby/application/slice'
import { eventChannel } from 'redux-saga'
import type { ReceivedPlayersPayload, LobbyActions } from 'features/Lobby/application/slice'

const lobbyChannel: SocketChannel<LobbyActions> = (socket: AppSocket) => {
  return eventChannel(emitter => {
    const onPlayersListener = (payload: ReceivedPlayersPayload) => {
      emitter(receivedPlayers(payload))
    }

    const onGameStartedListener = () => {
      emitter(gameStarted())
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
