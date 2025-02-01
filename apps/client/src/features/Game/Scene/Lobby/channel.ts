import { AppSocket, SocketChannel, UserPayload } from 'services/socket'
import { LobbyActions, receivedPlayers, started } from 'features/Game/slice'
import { eventChannel } from 'redux-saga'

const lobbyChannel: SocketChannel<LobbyActions> = (socket: AppSocket) => {
  return eventChannel(emitter => {
    const onPlayersListener = (players: Iterable<UserPayload>) => {
      emitter(receivedPlayers(Array.from(players)))
    }

    const onGameStartedListener = () => {
      emitter(started())
    }

    socket.on('players', onPlayersListener)
    socket.on('gameStarted', onGameStartedListener)

    return () => {
      socket.off('players', onPlayersListener)
    }
  })
}

export default lobbyChannel
