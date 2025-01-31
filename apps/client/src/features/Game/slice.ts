import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Selector } from 'app/store'
import { Hero, UserPayload } from 'services/socket'
import { left } from 'features/Rooms/slice'

export enum GameStatus {
  Lobby = 'lobby',
  Starting = 'starting',
  Started = 'started',
  Error = 'error'
}

export type State = {
  players: UserPayload[]
  status: GameStatus
}

export const initialState: State = {
  players: [],
  status: GameStatus.Lobby
}

export type ChangeHeroPayload = {
  hero: Hero
}

const slice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    receivedPlayers: (state, action: PayloadAction<UserPayload[]>) => ({
      ...state,
      players: action.payload
    }),
    changeHero: (state, _action: PayloadAction<ChangeHeroPayload>) => ({
      ...state
    }),
    error: state => ({
      ...state,
      status: GameStatus.Error
    })
  },
  extraReducers: builder => {
    builder
      .addCase(left, state => ({
        ...state,
        players: []
      }))
  }
})

export const {
  receivedPlayers,
  changeHero,
  error
} = slice.actions

export const selectInLobby: Selector<boolean> = state =>
  state.game.status === GameStatus.Lobby

export const selectPlayers: Selector<UserPayload[]> = state =>
  state.game.players

export const selectIsHost: Selector<boolean> = state =>
  state.game.players.find(p => p.id === state.auth.id)?.host || false

export type LobbyActions =
  ReturnType<typeof receivedPlayers> |
  ReturnType<typeof changeHero> |
  ReturnType<typeof error>

export default slice
