import { all, call, fork, put, take, takeLatest } from 'redux-saga/effects'
import { connect, connected, error, type ConnectPayload } from 'features/Authentication/slice'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createWebsocketConnection } from 'services/socket'
import { subscribeCreateRoom, subscribeJoinRoom, subscribeLeaveRoom } from 'features/Rooms/effects'
import { subscribeChangeHero } from 'features/Game/effects'
import roomChannel from 'features/Rooms/channel'
import lobbyChannel from 'features/Game/Scene/Lobby/channel'

export function* connectAndSubscribeWebsocketEffect(action: PayloadAction<ConnectPayload>): Generator {
  try {
    const socket = yield call(createWebsocketConnection, action.payload.username)
    yield put(connected(socket.id))

    const rooms = yield call(roomChannel, socket)
    const lobby = yield call(lobbyChannel, socket)

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

    yield all([
      fork(subscribeCreateRoom, socket),
      fork(subscribeJoinRoom, socket),
      fork(subscribeLeaveRoom, socket),
      fork(subscribeChangeHero, socket)
    ])
  } catch {
    yield put(error())
  }
}

export default function* rootSaga(): Generator {
  yield takeLatest(connect, connectAndSubscribeWebsocketEffect)
}
