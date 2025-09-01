import type { SocketChannel, AppSocket } from 'services/socket'
import { eventChannel } from 'redux-saga'
import type {
  GameActions,
  PlayerTurnPayload,
  DiscoverTilePayload,
  ReceivedChestsPayload,
  ReceivedSkeletonsPayload,
  ReceivedLootsPayload,
  GameEndedPayload
} from 'features/Game/Dungeon/application/slice'
import {
  playerTurn,
  discoverTile,
  receivedChests,
  receivedEnemies,
  receivedLoots,
  gameEnded,
  gameRestarted
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

    const onGameEndedListener = (payload: GameEndedPayload) => {
      emitter(gameEnded(payload))
    }

    const onGameRestartedListener = () => {
      emitter(gameRestarted())
    }

    socket.on('playerTurn', onPlayerTurnListener)
    socket.on('discoverTile', onDiscoverTileListener)
    socket.on('chests', onChestsListener)
    socket.on('enemies', onEnemiesListener)
    socket.on('loots', onLootsListener)
    socket.on('gameEnded', onGameEndedListener)
    socket.on('gameRestarted', onGameRestartedListener)

    return () => {
      socket.off('playerTurn', onPlayerTurnListener)
      socket.off('discoverTile', onDiscoverTileListener)
      socket.off('chests', onChestsListener)
      socket.off('enemies', onEnemiesListener)
      socket.off('loots', onLootsListener)
      socket.off('gameEnded', onGameEndedListener)
      socket.off('gameRestarted', onGameRestartedListener)
    }
  })
}

export default gameChannel
