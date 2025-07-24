import type { SocketChannel, AppSocket } from 'services/socket'
import { eventChannel } from 'redux-saga'
import type {
  GameActions,
  PlayerTurnPayload,
  DiscoverTilePayload,
  ReceivedChestsPayload,
  ReceivedSkeletonsPayload,
  ReceivedLootsPayload
} from 'features/Game/Dungeon/application/slice'
import {
  playerTurn,
  discoverTile,
  receivedChests,
  receivedEnemies,
  receivedLoots
} from 'features/Game/Dungeon/application/slice'

const gameChannel: SocketChannel<GameActions> = (socket: AppSocket) => {
  return eventChannel(emitter => {
    const onPlayerTurnListener = (payload: PlayerTurnPayload) => {
      emitter(playerTurn(payload))
    }

    const onDiscoverTileListener = (payload: DiscoverTilePayload) => {
      emitter(discoverTile(payload))
    }

    const onChestsListener = (payload: ReceivedChestsPayload) => {
      emitter(receivedChests(payload))
    }

    const onEnemiesListener = (payload: ReceivedSkeletonsPayload) => {
      emitter(receivedEnemies(payload))
    }

    const onLootsListener = (payload: ReceivedLootsPayload) => {
      emitter(receivedLoots(payload))
    }

    socket.on('playerTurn', onPlayerTurnListener)
    socket.on('discoverTile', onDiscoverTileListener)
    socket.on('chests', onChestsListener)
    socket.on('enemies', onEnemiesListener)
    socket.on('loots', onLootsListener)

    return () => {
      socket.off('playerTurn', onPlayerTurnListener)
      socket.off('discoverTile', onDiscoverTileListener)
      socket.off('chests', onChestsListener)
      socket.off('enemies', onEnemiesListener)
      socket.off('loots', onLootsListener)
    }
  })
}

export default gameChannel
