import type { UserPayload } from 'types/user'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Selector } from 'app/store'
import { Hero } from 'types/user'
import { createSlice } from '@reduxjs/toolkit'

export enum LobbyStatus {
  WaitingPlayers = 'waiting',
  GameStarting = 'starting',
  GameStarted = 'started'
}

export type State = {
  players: UserPayload[]
  status: LobbyStatus
}

export const initialState: State = {
  players: [],
  status: LobbyStatus.WaitingPlayers
}

export type ChangeHeroPayload = {
  readonly hero: Hero
}

export type ReceivedPlayersPayload = {
  readonly players: UserPayload[]
}

export type StartGamePayload = {
  readonly roomId: string
}

const slice = createSlice({
  name: 'lobby',
  initialState,
  reducers: {
    receivedPlayers: (state, action: PayloadAction<ReceivedPlayersPayload>) => ({
      ...state,
      players: action.payload.players
    }),
    changeHero: (state, _action: PayloadAction<ChangeHeroPayload>) => ({
      ...state,
    }),
    startGame: (state, _action: PayloadAction<StartGamePayload>) => ({
      ...state,
      status: LobbyStatus.GameStarting
    }),
    gameStarted: state => ({
      ...state,
      status: LobbyStatus.GameStarted,
    })
  }
})

export const {
  receivedPlayers,
  changeHero,
  startGame,
  gameStarted
} = slice.actions

export const selectIsWaitingForPlayers: Selector<boolean> = state =>
  state.lobby.status === LobbyStatus.WaitingPlayers

export const selectIsGameStarted: Selector<boolean> = state =>
  state.lobby.status === LobbyStatus.GameStarted

export const selectPlayers: Selector<UserPayload[]> = state =>
  state.lobby.players

export const selectIsHost: Selector<boolean> = state =>
  state.lobby.players.find(p => p.id === state.auth.id)?.host || false

export type LobbyActions =
  ReturnType<typeof receivedPlayers> |
  ReturnType<typeof changeHero> |
  ReturnType<typeof startGame> |
  ReturnType<typeof gameStarted>

export default slice
