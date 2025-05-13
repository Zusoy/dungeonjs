import type { SocketChannel, AppSocket } from 'services/socket'
import type { Tile } from 'types/tile'
import type { UserPayload } from 'types/user'
import type { Chest } from 'types/object'
import type { Skeleton } from 'types/enemy'
import { discoverTile, discoverChest, GameActions, playerTurn, BeginFightPayload, startFight, AttackResultPayload, attacked, receivedEnemies } from 'features/Game/slice'
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

    const onStartFightListener = (payload: BeginFightPayload) => {
      emitter(startFight(payload))
    }

    const onFightAttackedListener = (payload: AttackResultPayload) => {
      emitter(attacked(payload))
    }

    const onEnemiesListener = (payload: Iterable<Skeleton>) => {
      emitter(receivedEnemies(Array.from(payload)))
    }

    socket.on('playerTurn', onPlayerTurnListener)
    socket.on('discoverTile', onDiscoverTileListener)
    socket.on('discoverChest', onDiscoverChestListener)
    socket.on('startFight', onStartFightListener)
    socket.on('attacked', onFightAttackedListener)
    socket.on('enemies', onEnemiesListener)

    return () => {
      socket.off('playerTurn', onPlayerTurnListener)
      socket.off('discoverTile', onDiscoverTileListener)
      socket.off('discoverChest', onDiscoverChestListener)
      socket.off('startFight', onStartFightListener)
      socket.off('attacked', onFightAttackedListener)
      socket.off('enemies', onEnemiesListener)
    }
  })
}

export default gameChannel
