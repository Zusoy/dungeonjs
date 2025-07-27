import type { PayloadAction } from '@reduxjs/toolkit'
import type { AppSocket } from 'services/socket'
import { apply, call, takeLatest } from 'redux-saga/effects'
import slice, { AttackPayload } from 'features/Game/Combat/application/slice'

export function* attackEffect(action: PayloadAction<AttackPayload>, socket: AppSocket): Generator {
  try {
    yield apply(socket, 'emit', ['attack', action.payload])
  } catch (e) {
    console.error(e)
  }
}

export function* subscribeAttack(socket: AppSocket): Generator {
  yield takeLatest(slice.actions.attack, function* (action: PayloadAction<AttackPayload>): Generator {
    yield call(attackEffect, action, socket)
  })
}
