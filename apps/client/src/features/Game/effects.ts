import type { PayloadAction } from '@reduxjs/toolkit'
import { apply, call, put, takeLatest } from 'redux-saga/effects'
import { AppSocket } from 'services/socket'
import {
  attack,
  changeHero,
  ChangeHeroPayload,
  error,
  StartGamePayload,
  startGame,
  moveToCoords,
  MoveToCoordsPayload,
  AttackPayload,
  LootPayload,
  loot
} from 'features/Game/slice'

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

export function* attackEffect(action: PayloadAction<AttackPayload>, socket: AppSocket): Generator {
  try {
    yield apply(socket, 'emit', ['attack', action.payload])
  } catch {
    yield put(error())
  }
}

export function* moveToCoordsEffect(action: PayloadAction<MoveToCoordsPayload>, socket: AppSocket): Generator {
  try {
    yield apply(socket, 'emit', ['moveToCoords', action.payload])
  } catch {
    yield put(error())
  }
}

export function* lootEffect(action: PayloadAction<LootPayload>, socket: AppSocket): Generator {
  try {
    yield apply(socket, 'emit', ['loot', action.payload])
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

export function* subscribeAttack(socket: AppSocket): Generator {
  yield takeLatest(attack, function* (action: PayloadAction<AttackPayload>): Generator {
    yield call(attackEffect, action, socket)
  })
}

export function* subscribeMoveToCoords(socket: AppSocket): Generator {
  yield takeLatest(moveToCoords, function* (action: PayloadAction<MoveToCoordsPayload>): Generator {
    yield call(moveToCoordsEffect, action, socket)
  })
}

export function* subscribeLoot(socket: AppSocket): Generator {
  yield takeLatest(loot, function* (action: PayloadAction<LootPayload>): Generator {
    yield call(lootEffect, action, socket)
  })
}
