import type { PayloadAction } from '@reduxjs/toolkit'
import type { ChangeHeroPayload, StartGamePayload } from 'features/Lobby/application/slice'
import { apply, call, takeLatest } from 'redux-saga/effects'
import { AppSocket } from 'services/socket'
import { changeHero, startGame } from 'features/Lobby/application/slice'

export function* changeHeroEffect(action: PayloadAction<ChangeHeroPayload>, socket: AppSocket): Generator {
  try {
    yield apply(socket, 'emit', ['changeHero', action.payload])
  } catch (e) {
    console.error(e)
  }
}

export function* startGameEffect(action: PayloadAction<StartGamePayload>, socket: AppSocket): Generator {
  try {
    yield apply(socket, 'emit', ['startGame', action.payload])
  } catch (e) {
    console.error(e)
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
