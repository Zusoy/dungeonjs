import type { PayloadAction } from '@reduxjs/toolkit'
import { all, call, fork, put, take, takeLatest } from 'redux-saga/effects'
import { connect, connected, error, type ConnectPayload } from 'features/Authentication/application/slice'
import { createWebsocketConnection } from 'services/socket'
import { subscribeCreateRoom, subscribeJoinRoom, subscribeLeaveRoom } from 'features/Rooms/infrastructure/effects'
import { subscribeChangeHero, subscribeStartGame } from 'features/Lobby/infrastructure/effects'
import { subscribeMoveToCoords, subscribeLoot, subscribePickChest, subscribeEndTurn } from 'features/Game/Dungeon/infrastructure/effects'
import { subscribeAttack } from 'features/Game/Combat/infrastructure/effects'
import roomChannel from 'features/Rooms/infrastructure/channel'
import lobbyChannel from 'features/Lobby/infrastructure/channel'
import gameChannel from 'features/Game/Dungeon/infrastructure/channel'
import combatChannel from 'features/Game/Combat/infrastructure/channel'

export function* connectAndSubscribeWebsocketEffect(action: PayloadAction<ConnectPayload>): Generator {
  try {
    const socket = yield call(createWebsocketConnection, action.payload.username)
    yield put(connected(socket.id))

    const rooms = yield call(roomChannel, socket)
    const lobby = yield call(lobbyChannel, socket)
    const game = yield call(gameChannel, socket)
    const combat = yield call(combatChannel, socket)

    yield fork(function* (): Generator {
      while (true) {
        const roomAction = yield take(rooms)
        yield put(roomAction)
      }
    })

    yield fork(function* (): Generator {
      while (true) {
        const lobbyAction = yield take(lobby)
        yield put(lobbyAction)
      }
    })

    yield fork(function* (): Generator {
      while (true) {
        const gameAction = yield take(game)
        yield put(gameAction)
      }
    })

    yield fork(function* (): Generator {
      while (true) {
        const combatAction = yield take(combat)
        yield put(combatAction)
      }
    })

    yield all([
      fork(subscribeCreateRoom, socket),
      fork(subscribeJoinRoom, socket),
      fork(subscribeLeaveRoom, socket),
      fork(subscribeChangeHero, socket),
      fork(subscribeStartGame, socket),
      fork(subscribeMoveToCoords, socket),
      fork(subscribeLoot, socket),
      fork(subscribePickChest, socket),
      fork(subscribeEndTurn, socket),
      fork(subscribeAttack, socket),
    ])
  } catch {
    yield put(error())
  }
}

export default function* rootSaga(): Generator {
  yield takeLatest(connect, connectAndSubscribeWebsocketEffect)
}
