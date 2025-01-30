import { AppSocket, SocketChannel, UserPayload } from 'services/socket'
import { LobbyActions, receivedPlayers } from 'features/Game/slice'
import { eventChannel } from 'redux-saga'

const lobbyChannel: SocketChannel<LobbyActions> = (socket: AppSocket) => {
  return eventChannel(emitter => {
    const onPlayersListener = (players: Iterable<UserPayload>) => {
      emitter(receivedPlayers(Array.from(players)))
    }

    socket.on('players', onPlayersListener)

    return () => {
      socket.off('players', onPlayersListener)
    }
  })
}

export default lobbyChannel
