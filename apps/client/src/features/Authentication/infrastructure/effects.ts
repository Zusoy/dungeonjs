import type { PayloadAction } from '@reduxjs/toolkit'
import { all, call, fork, put, take, takeLatest } from 'redux-saga/effects'
import { connect, connected, error, type ConnectPayload } from 'features/Authentication/application/slice'
import { createWebsocketConnection } from 'services/socket'
import { subscribeCreateRoom, subscribeJoinRoom, subscribeLeaveRoom } from 'features/Rooms/infrastructure/effects'
import { subscribeChangeHero, subscribeStartGame } from 'features/Lobby/infrastructure/effects'
import { subscribeMoveToCoords, subscribeAttack, subscribeLoot, subscribePickChest, subscribeEndTurn } from 'features/Game/infrastructure/effects'
import roomChannel from 'features/Rooms/infrastructure/channel'
import lobbyChannel from 'features/Lobby/infrastructure/channel'
import gameChannel from 'features/Game/infrastructure/channel'

export function* connectAndSubscribeWebsocketEffect(action: PayloadAction<ConnectPayload>): Generator {
  try {
    const socket = yield call(createWebsocketConnection, action.payload.username)
    yield put(connected(socket.id))

    const rooms = yield call(roomChannel, socket)
    const lobby = yield call(lobbyChannel, socket)
    const game = yield call(gameChannel, socket)

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

    yield all([
      fork(subscribeCreateRoom, socket),
      fork(subscribeJoinRoom, socket),
      fork(subscribeLeaveRoom, socket),
      fork(subscribeChangeHero, socket),
      fork(subscribeStartGame, socket),
      fork(subscribeAttack, socket),
      fork(subscribeMoveToCoords, socket),
      fork(subscribeLoot, socket),
      fork(subscribePickChest, socket),
      fork(subscribeEndTurn, socket),
    ])
  } catch {
    yield put(error())
  }
}

export default function* rootSaga(): Generator {
  yield takeLatest(connect, connectAndSubscribeWebsocketEffect)
}
