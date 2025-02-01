import { PayloadAction } from '@reduxjs/toolkit'
import { changeHero, ChangeHeroPayload, error, StartGamePayload, startGame } from 'features/Game/slice'
import { apply, call, put, takeLatest } from 'redux-saga/effects'
import { AppSocket } from 'services/socket'

export function* changeHeroEffect(action: PayloadAction<ChangeHeroPayload>, socket: AppSocket): Generator {
  try {
    yield apply(socket, 'emit', ['changeHero', action.payload])
  } catch {
    yield put(error())
  }
}

export function* startGameEffect(action: PayloadAction<StartGamePayload>, socket: AppSocket): Generator {
  try {
    yield apply(socket, 'emit', ['startGame', action.payload])
  } catch {
    yield put(error())
  }
}

export function* subscribeChangeHero(socket: AppSocket): Generator {
  yield takeLatest(changeHero, function* (action: PayloadAction<ChangeHeroPayload>): Generator {
    yield call(changeHeroEffect, action, socket)
  })
}

export function* subscribeStartGame(socket: AppSocket): Generator {
  yield takeLatest(startGame, function* (action: PayloadAction<StartGamePayload>): Generator {
    yield call(startGameEffect, action, socket)
  })
}