import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Skeleton } from 'types/enemy'
import type { ScalarCoords } from 'types/coords'
import type { UserPayload } from 'types/user'
import type { Nullable } from 'types/utils'
import { selectPlayers } from 'features/Lobby/application/slice'
import { selectEnemies } from 'features/Game/Dungeon/application/slice'
import { Selector } from 'app/store'

export enum CombatStatus {
  None = 'none',
  Engaged = 'engaged',
  Resolved = 'resolved'
}

export type CombatResult = {
  readonly firstDiceResult: number
  readonly secondDiceResult: number
  readonly succeed: boolean
  readonly inventoryBonus: number
}

export type State = {
  status: CombatStatus,
  playerId: Nullable<UserPayload['id']>
  enemyId: Nullable<Skeleton['id']>
  originCoords: Nullable<ScalarCoords>
  result: Nullable<CombatResult>
}

export type EngageCombatPayload = {
  readonly playerId: UserPayload['id']
  readonly enemyId: Skeleton['id']
  readonly originCoords: ScalarCoords
}

export type CombatResolvedPayload = {
  readonly succeed: boolean
  readonly firstDiceResult: number
  readonly secondDiceResult: number
  readonly inventoryBonus: number
}

export type AttackPayload = {
  readonly enemyId: Skeleton['id']
  readonly originCoords: ScalarCoords
}

export const initialState: State = {
  status: CombatStatus.None,
  playerId: null,
  enemyId: null,
  originCoords: null,
  result: null
}

const slice = createSlice({
  name: 'combat',
  initialState,
  reducers: {
    combatEngaged: (state, action: PayloadAction<EngageCombatPayload>) => ({
      ...state,
      status: CombatStatus.Engaged,
      playerId: action.payload.playerId,
      enemyId: action.payload.enemyId,
      originCoords: action.payload.originCoords
    }),
    combatResolved: (state, action: PayloadAction<CombatResolvedPayload>) => ({
      ...state,
      status: CombatStatus.Resolved,
      result: {
        firstDiceResult: action.payload.firstDiceResult,
        secondDiceResult: action.payload.secondDiceResult,
        succeed: action.payload.succeed,
        inventoryBonus: action.payload.inventoryBonus
      }
    }),
    combatEnded: (state) => ({
      ...state,
      playerId: null,
      enemyId: null,
      originCoords: null,
      result: null,
      status: CombatStatus.None
    }),
    attack: (state, _action: PayloadAction<AttackPayload>) => ({
      ...state,
    })
  }
})

export const {
  attack,
  combatResolved,
  combatEnded,
  combatEngaged
} = slice.actions

export const selectCombatStatus: Selector<CombatStatus> = state =>
  state.combat.status

export const selectFightingPlayerId: Selector<Nullable<UserPayload['id']>> = state =>
  state.combat.playerId

export const selectFightingEnemyId: Selector<Nullable<Skeleton['id']>> = state =>
  state.combat.enemyId

export const selectFightingPlayer = createSelector(
  [selectPlayers, selectFightingPlayerId],
  (players, fightingPlayerId) => {
    if (!fightingPlayerId) {
      return null
    }

    return players.find(p => p.id === fightingPlayerId) || null
  }
)

export const selectFightingEnemy = createSelector(
  [selectEnemies, selectFightingEnemyId],
  (enemies, fightingEnemyId) => {
    if (!fightingEnemyId) {
      return null
    }

    return enemies.find(e => e.id === fightingEnemyId) || null
  }
)

export const selectCombatOriginCoords: Selector<Nullable<ScalarCoords>> = state =>
  state.combat.originCoords

export const selectCombatResult: Selector<Nullable<CombatResult>> = state =>
  state.combat.result

export type CombatActions =
  ReturnType<typeof combatResolved> |
  ReturnType<typeof combatEngaged> |
  ReturnType<typeof attack>

export default slice
