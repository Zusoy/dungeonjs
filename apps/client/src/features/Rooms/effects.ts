import { apply, call, put, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { create, CreateRoomPayload, error, join, JoinRoomPayload, leave, LeaveRoomPayload } from 'features/Rooms/slice'
import { AppSocket } from 'services/socket'

export function* createRoomEffect(action: PayloadAction<CreateRoomPayload>, socket: AppSocket): Generator {
  try {
    yield apply(socket, 'emit', ['createRoom', action.payload])
  } catch {
    yield put(error())
  }
}

export function* joinRoomEffect(action: PayloadAction<JoinRoomPayload>, socket: AppSocket): Generator {
  try {
    yield apply(socket, 'emit', ['joinRoom', action.payload])
  } catch {
    yield put(error())
  }
}

export function* leaveRoomEffect(action: PayloadAction<LeaveRoomPayload>, socket: AppSocket): Generator {
  try {
    yield apply(socket, 'emit', ['leaveRoom', action.payload])
  } catch {
    yield put(error())
  }
}

export function* subscribeCreateRoom(socket: AppSocket): Generator {
  yield takeLatest(create, function* (action: PayloadAction<CreateRoomPayload>): Generator {
    yield call(createRoomEffect, action, socket)
  })
}

export function* subscribeJoinRoom(socket: AppSocket): Generator {
  yield takeLatest(join, function* (action: PayloadAction<JoinRoomPayload>): Generator {
    yield call(joinRoomEffect, action, socket)
  })
}

export function* subscribeLeaveRoom(socket: AppSocket): Generator {
  yield takeLatest(leave, function* (action: PayloadAction<LeaveRoomPayload>): Generator {
    yield call(leaveRoomEffect, action, socket)
  })
}
