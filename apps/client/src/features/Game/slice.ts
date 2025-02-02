import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Selector } from 'app/store'
import { Coords, Hero, UserPayload, VectorTuple } from 'services/socket'
import { left } from 'features/Rooms/slice'
import { Nullable } from 'utils'
import { Direction, ITile, TileType } from 'features/Game/Tile/type'

export enum GameStatus {
  Lobby = 'lobby',
  Starting = 'starting',
  Started = 'started',
  Error = 'error'
}

export type State = {
  players: UserPayload[],
  coords: Coords,
  tiles: ITile[],
  playerTurn: Nullable<UserPayload['id']>
  status: GameStatus
}

export const initialState: State = {
  players: [],
  coords: [0, 0],
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
  readonly coords: Coords
  readonly fromDirection: VectorTuple
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
      ...state,
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

export const selectTiles: Selector<ITile[]> = state =>
  state.game.tiles

export type LobbyActions =
  ReturnType<typeof receivedPlayers> |
  ReturnType<typeof changeHero> |
  ReturnType<typeof startGame> |
  ReturnType<typeof started> |
  ReturnType<typeof error>

export type GameActions =
  ReturnType<typeof playerTurn> |
  ReturnType<typeof moveToCoords>

export default slice
