import type { SocketChannel, AppSocket } from 'services/socket'
import { discoverTile, discoverChest, GameActions, playerTurn, BeginFightPayload, startFight, AttackResultPayload, attacked, receivedEnemies, DiscoverChestPayload, DiscoverTilePayload, PlayerTurnPayload, ReceivedSkeletonsPayload, ReceivedLootsPayload, receivedLoots } from 'features/Game/slice'
import { eventChannel } from 'redux-saga'

const gameChannel: SocketChannel<GameActions> = (socket: AppSocket) => {
  return eventChannel(emitter => {
    const onPlayerTurnListener = (payload: PlayerTurnPayload) => {
      emitter(playerTurn(payload))
    }

    const onDiscoverTileListener = (payload: DiscoverTilePayload) => {
      emitter(discoverTile(payload))
    }

    const onDiscoverChestListener = (payload: DiscoverChestPayload) => {
      emitter(discoverChest(payload))
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
    socket.on('discoverChest', onDiscoverChestListener)
    socket.on('startFight', onStartFightListener)
    socket.on('attacked', onFightAttackedListener)
    socket.on('enemies', onEnemiesListener)
    socket.on('loots', onLootsListener)

    return () => {
      socket.off('playerTurn', onPlayerTurnListener)
      socket.off('discoverTile', onDiscoverTileListener)
      socket.off('discoverChest', onDiscoverChestListener)
      socket.off('startFight', onStartFightListener)
      socket.off('attacked', onFightAttackedListener)
      socket.off('enemies', onEnemiesListener)
      socket.off('loots', onLootsListener)
    }
  })
}

export default gameChannel
