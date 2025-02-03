import type { SocketChannel, AppSocket, UserPayload } from 'services/socket'
import { discoverTile, GameActions, playerTurn } from 'features/Game/slice'
import { eventChannel } from 'redux-saga'
import { ITile } from 'features/Game/Tile/type'

const gameChannel: SocketChannel<GameActions> = (socket: AppSocket) => {
  return eventChannel(emitter => {
    const onPlayerTurnListener = (playerId: UserPayload['id']) => {
      emitter(playerTurn(playerId))
    }

    const onDiscoverTileListener = (tile: ITile) => {
      emitter(discoverTile(tile))
    }

    socket.on('playerTurn', onPlayerTurnListener)
    socket.on('discoverTile', onDiscoverTileListener)

    return () => {
      socket.off('playerTurn', onPlayerTurnListener)
      socket.off('discoverTile', onDiscoverTileListener)
    }
  })
}

export default gameChannel
