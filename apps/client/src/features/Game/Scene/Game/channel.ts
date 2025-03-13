import type { SocketChannel, AppSocket } from 'services/socket'
import type { Tile } from 'types/tile'
import type { UserPayload } from 'types/user'
import { discoverTile, GameActions, playerTurn } from 'features/Game/slice'
import { eventChannel } from 'redux-saga'

const gameChannel: SocketChannel<GameActions> = (socket: AppSocket) => {
  return eventChannel(emitter => {
    const onPlayerTurnListener = (playerId: UserPayload['id']) => {
      emitter(playerTurn(playerId))
    }

    const onDiscoverTileListener = (tile: Tile) => {
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
