import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Selector } from 'app/store'
import { Hero, UserPayload } from 'types/user'
import { left } from 'features/Rooms/slice'
import type { ScalarCoords } from 'types/coords'
import { type Tile, TileType } from 'types/tile'
import { type Nullable, type VectorTuple, Direction } from 'types/utils'

export enum GameStatus {
  Lobby = 'lobby',
  Starting = 'starting',
  Started = 'started',
  Error = 'error'
}

export type State = {
  players: UserPayload[]
  tiles: Tile[],
  playerTurn: Nullable<UserPayload['id']>
  status: GameStatus
}

export const initialState: State = {
  players: [],
  tiles: [
    { id: 'start_01', type: TileType.Room, directions: Direction.All, coords: [0, 0] }
  ],
  playerTurn: null,
  status: GameStatus.Lobby
}

export type ChangeHeroPayload = {
  readonly hero: Hero
}

export type StartGamePayload = {
  readonly roomId: string
}

export type MoveToCoordsPayload = {
  readonly coords: ScalarCoords
  readonly fromDirection: VectorTuple
  readonly neighborTiles: Tile[]
  readonly uncharted: boolean
}

const slice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    receivedPlayers: (state, action: PayloadAction<UserPayload[]>) => ({
      ...state,
      players: action.payload
    }),
    playerTurn: (state, action: PayloadAction<UserPayload['id']>) => ({
      ...state,
      playerTurn: action.payload
    }),
    changeHero: (state, _action: PayloadAction<ChangeHeroPayload>) => ({
      ...state
    }),
    startGame: (state, _action: PayloadAction<StartGamePayload>) => ({
      ...state,
      status: GameStatus.Starting
    }),
    started: state => ({
      ...state,
      status: GameStatus.Started
    }),
    moveToCoords: (state, _action: PayloadAction<MoveToCoordsPayload>) => ({
      ...state
    }),
    discoverTile: (state, action: PayloadAction<Tile>) => ({
      ...state,
      tiles: [...state.tiles, action.payload]
    }),
    error: state => ({
      ...state,
      status: GameStatus.Error,
      players: []
    })
  },
  extraReducers: builder => {
    builder
      .addCase(left, state => ({
        ...state,
        status: GameStatus.Lobby,
        players: []
      }))
  }
})

export const {
  receivedPlayers,
  changeHero,
  startGame,
  playerTurn,
  started,
  moveToCoords,
  discoverTile,
  error
} = slice.actions

export const selectInLobby: Selector<boolean> = state =>
  state.game.status === GameStatus.Lobby

export const selectIsStarting: Selector<boolean> = state =>
  state.game.status === GameStatus.Starting

export const selectIsStarted: Selector<boolean> = state =>
  state.game.status === GameStatus.Started

export const selectPlayers: Selector<UserPayload[]> = state =>
  state.game.players

export const selectIsHost: Selector<boolean> = state =>
  state.game.players.find(p => p.id === state.auth.id)?.host || false

export const selectIsPlayerTurn: Selector<boolean> = state =>
  state.game.playerTurn === state.auth.id

export const selectPlayerTurn: Selector<State['playerTurn']> = state =>
  state.game.playerTurn

export const selectTiles: Selector<Tile[]> = state =>
  state.game.tiles

export const selectCurrentPlayer: Selector<UserPayload> = state =>
  state.game.players.find(p => p.id === state.auth.id)!

export type LobbyActions =
  ReturnType<typeof receivedPlayers> |
  ReturnType<typeof changeHero> |
  ReturnType<typeof startGame> |
  ReturnType<typeof started> |
  ReturnType<typeof error>

export type GameActions =
  ReturnType<typeof playerTurn> |
  ReturnType<typeof moveToCoords> |
  ReturnType<typeof discoverTile>

export default slice
