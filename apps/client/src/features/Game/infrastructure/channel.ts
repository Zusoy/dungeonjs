import type { SocketChannel, AppSocket } from 'services/socket'
import { eventChannel } from 'redux-saga'
import type {
  GameActions,
  PlayerTurnPayload,
  DiscoverTilePayload,
  ReceivedChestsPayload,
  BeginFightPayload,
  AttackResultPayload,
  ReceivedSkeletonsPayload,
  ReceivedLootsPayload
} from 'features/Game/application/slice'
import {
  playerTurn,
  discoverTile,
  receivedChests,
  startFight,
  attacked,
  receivedEnemies,
  receivedLoots
} from 'features/Game/application/slice'

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

    const onStartFightListener = (payload: BeginFightPayload) => {
      emitter(startFight(payload))
    }

    const onFightAttackedListener = (payload: AttackResultPayload) => {
      emitter(attacked(payload))
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
    socket.on('startFight', onStartFightListener)
    socket.on('attacked', onFightAttackedListener)
    socket.on('enemies', onEnemiesListener)
    socket.on('loots', onLootsListener)

    return () => {
      socket.off('playerTurn', onPlayerTurnListener)
      socket.off('discoverTile', onDiscoverTileListener)
      socket.off('chests', onChestsListener)
      socket.off('startFight', onStartFightListener)
      socket.off('attacked', onFightAttackedListener)
      socket.off('enemies', onEnemiesListener)
      socket.off('loots', onLootsListener)
    }
  })
}

export default gameChannel
