import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Skeleton } from 'types/enemy'
import type { ScalarCoords } from 'types/coords'
import type { UserPayload } from 'types/user'
import type { Nullable } from 'types/utils'

export enum CombatStatus {
  None = 'none',
  Engaged = 'engaged',
  Resolved = 'resolved'
}

export type State = {
  status: CombatStatus,
  playerId: Nullable<UserPayload['id']>
  enemyId: Nullable<Skeleton['id']>
  originCoords: Nullable<ScalarCoords>
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
  originCoords: null
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
    combatResolved: (state, _action: PayloadAction<CombatResolvedPayload>) => ({
      ...state,
      status: CombatStatus.Resolved,
    }),
    attack: (state, _action: PayloadAction<AttackPayload>) => ({
      ...state,
    })
  }
})

export const {
  attack,
  combatResolved,
  combatEngaged
} = slice.actions

export type CombatActions =
  ReturnType<typeof combatResolved> |
  ReturnType<typeof combatEngaged> |
  ReturnType<typeof attack>

export default slice
