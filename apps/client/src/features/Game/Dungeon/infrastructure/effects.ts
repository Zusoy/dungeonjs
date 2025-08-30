import type { PayloadAction } from '@reduxjs/toolkit'
import type { AppSocket } from 'services/socket'
import { apply, call, takeLatest } from 'redux-saga/effects'
import slice, { EndTurnPayload, LootPayload, MoveToCoordsPayload, NewGamePayload, PickChestPayload } from 'features/Game/Dungeon/application/slice'

export function* restartGameEffect(action: PayloadAction<NewGamePayload>, socket: AppSocket): Generator {
  try {
    yield apply(socket, 'emit', ['newGame', action.payload])
  } catch (e) {
    console.error(e)
  }
}

export function* endTurnEffect(action: PayloadAction<EndTurnPayload>, socket: AppSocket): Generator {
  try {
    yield apply(socket, 'emit', ['endTurn', action.payload])
  } catch (e) {
    console.error(e)
  }
}

export function* moveToCoordsEffect(action: PayloadAction<MoveToCoordsPayload>, socket: AppSocket): Generator {
  try {
    yield apply(socket, 'emit', ['moveToCoords', action.payload])
  } catch (e) {
    console.error(e)
  }
}

export function* lootEffect(action: PayloadAction<LootPayload>, socket: AppSocket): Generator {
  try {
    yield apply(socket, 'emit', ['loot', action.payload])
  } catch (e) {
    console.error(e)
  }
}

export function* pickChestEffect(action: PayloadAction<PickChestPayload>, socket: AppSocket): Generator {
  try {
    yield apply(socket, 'emit', ['pickChest', action.payload])
  } catch (e) {
    console.error(e)
  }
}

export function* subscribeEndTurn(socket: AppSocket): Generator {
  yield takeLatest(slice.actions.endTurn, function* (action: PayloadAction<EndTurnPayload>): Generator {
    yield call(endTurnEffect, action, socket)
  })
}

export function* subscribeMoveToCoords(socket: AppSocket): Generator {
  yield takeLatest(slice.actions.moveToCoords, function* (action: PayloadAction<MoveToCoordsPayload>): Generator {
    yield call(moveToCoordsEffect, action, socket)
  })
}

export function* subscribeLoot(socket: AppSocket): Generator {
  yield takeLatest(slice.actions.loot, function* (action: PayloadAction<LootPayload>): Generator {
    yield call(lootEffect, action, socket)
  })
}

export function* subscribePickChest(socket: AppSocket): Generator {
  yield takeLatest(slice.actions.pickChest, function* (action: PayloadAction<PickChestPayload>): Generator {
    yield call(pickChestEffect, action, socket)
  })
}

export function* subscribeRestartGame(socket: AppSocket): Generator {
  yield takeLatest(slice.actions.restartNewGame, function* (action: PayloadAction<NewGamePayload>): Generator {
    yield call(restartGameEffect, action, socket)
  })
}
