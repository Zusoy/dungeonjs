import type { SocketChannel, AppSocket } from 'services/socket'
import type { Tile } from 'types/tile'
import type { UserPayload } from 'types/user'
import type { Chest } from 'types/object'
import type { Skeleton } from 'types/enemy'
import { discoverTile, discoverChest, GameActions, playerTurn, discoverEnemy, BeginFightPayload, startFight, AttackResultPayload, attacked } from 'features/Game/slice'
import { eventChannel } from 'redux-saga'

const gameChannel: SocketChannel<GameActions> = (socket: AppSocket) => {
  return eventChannel(emitter => {
    const onPlayerTurnListener = (playerId: UserPayload['id']) => {
      emitter(playerTurn(playerId))
    }

    const onDiscoverTileListener = (tile: Tile) => {
      emitter(discoverTile(tile))
    }

    const onDiscoverChestListener = (chest: Chest) => {
      emitter(discoverChest(chest))
    }

    const onDiscoverEnemyListener = (enemy: Skeleton) => {
      emitter(discoverEnemy(enemy))
    }

    const onStartFightListener = (payload: BeginFightPayload) => {
      emitter(startFight(payload))
    }

    const onFightAttackedListener = (payload: AttackResultPayload) => {
      emitter(attacked(payload))
    }

    socket.on('playerTurn', onPlayerTurnListener)
    socket.on('discoverTile', onDiscoverTileListener)
    socket.on('discoverChest', onDiscoverChestListener)
    socket.on('discoverEnemy', onDiscoverEnemyListener)
    socket.on('startFight', onStartFightListener)
    socket.on('attacked', onFightAttackedListener)

    return () => {
      socket.off('playerTurn', onPlayerTurnListener)
      socket.off('discoverTile', onDiscoverTileListener)
      socket.off('discoverChest', onDiscoverChestListener)
      socket.off('discoverEnemy', onDiscoverEnemyListener)
      socket.off('startFight', onStartFightListener)
      socket.off('attacked', onFightAttackedListener)
    }
  })
}

export default gameChannel
