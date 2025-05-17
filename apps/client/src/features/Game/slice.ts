import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { selectId } from 'features/Authentication/slice'
import { left } from 'features/Rooms/slice'
import { Hero, type UserPayload } from 'types/user'
import type { Selector } from 'app/store'
import type { ScalarCoords } from 'types/coords'
import type { Chest } from 'types/object'
import type { Loot } from 'types/loot'
import { type Tile, TileType } from 'types/tile'
import type { Skeleton } from 'types/enemy'
import { type Nullable, type VectorTuple, Direction } from 'types/utils'

export enum GameStatus {
  Lobby = 'lobby',
  Starting = 'starting',
  Started = 'started',
  Error = 'error'
}

type Fight = {
  readonly playerId: UserPayload['id']
  readonly enemyId: Skeleton['id']
  readonly originCoords: ScalarCoords
}

export type State = {
  players: UserPayload[]
  enemies: Skeleton[]
  tiles: Tile[]
  chests: Chest[]
  loots: Loot[]
  playerTurn: Nullable<UserPayload['id']>
  status: GameStatus
  fight: Nullable<Fight>
  focusedCoords: Nullable<ScalarCoords>
}

export const initialState: State = {
  players: [],
  enemies: [],
  chests: [],
  loots: [],
  fight: null,
  tiles: [
    { id: 'start_01', type: TileType.Room, directions: Direction.All, coords: [0, 0] }
  ],
  playerTurn: null,
  status: GameStatus.Lobby,
  focusedCoords: null
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

export type BeginFightPayload = {
  readonly playerId: UserPayload['id']
  readonly enemyId: Skeleton['id']
  readonly originCoords: ScalarCoords
}

export type AttackPayload = {
  readonly enemyId: string
  readonly originCoords: ScalarCoords
}

export type ReceivedPlayersPayload = {
  readonly players: UserPayload[]
}

export type ReceivedSkeletonsPayload = {
  readonly skeletons: Skeleton[]
}

export type DiscoverChestPayload = {
  readonly chest: Chest
}

export type DiscoverTilePayload = {
  readonly tile: Tile
}

export type PlayerTurnPayload = {
  readonly playerId: string
}

export type AttackResultPayload = {
  readonly attack: number
  readonly succeed: boolean
}

const slice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    receivedPlayers: (state, action: PayloadAction<ReceivedPlayersPayload>) => ({
      ...state,
      players: action.payload.players
    }),
    receivedEnemies: (state, action: PayloadAction<ReceivedSkeletonsPayload>) => ({
      ...state,
      enemies: action.payload.skeletons
    }),
    playerTurn: (state, action: PayloadAction<PlayerTurnPayload>) => ({
      ...state,
      playerTurn: action.payload.playerId
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
    discoverTile: (state, action: PayloadAction<DiscoverTilePayload>) => ({
      ...state,
      tiles: [...state.tiles, action.payload.tile]
    }),
    discoverChest: (state, action: PayloadAction<DiscoverChestPayload>) => ({
      ...state,
      chests: [...state.chests, action.payload.chest]
    }),
    focusCoords: (state, action: PayloadAction<ScalarCoords>) => ({
      ...state,
      focusedCoords: action.payload
    }),
    startFight: (state, action: PayloadAction<BeginFightPayload>) => ({
      ...state,
      fight: {
        playerId: action.payload.playerId,
        enemyId: action.payload.enemyId,
        originCoords: action.payload.originCoords
      }
    }),
    attack: (state, _action: PayloadAction<AttackPayload>) => ({
      ...state
    }),
    attacked: (state, _action: PayloadAction<AttackResultPayload>) => ({
      ...state,
      fight: null
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
  receivedEnemies,
  changeHero,
  startGame,
  playerTurn,
  started,
  moveToCoords,
  discoverTile,
  discoverChest,
  focusCoords,
  startFight,
  attack,
  attacked,
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

export const selectChests: Selector<Chest[]> = state =>
  state.game.chests

export const selectEnemies: Selector<Skeleton[]> = state =>
  state.game.enemies

export const selectFocusedCoords: Selector<Nullable<ScalarCoords>> = state =>
  state.game.focusedCoords

export const selectCurrentPlayer = createSelector(
  [selectPlayers, selectId],
  (players, id) => players.find(p => p.id === id)!
)

export const selectCurrentFight: Selector<Nullable<Fight>> = state =>
  state.game.fight

export const selectFightingPlayer = createSelector([selectCurrentFight, selectPlayers], (fight, players) => {
  if (!fight) {
    return null
  }

  return players.find(p => p.id === fight.playerId) || null
})

export const selectFightingEnemy = createSelector([selectCurrentFight, selectEnemies], (fight, enemies) => {
  if (!fight) {
    return null
  }

  return enemies.find(e => e.id === fight.enemyId) || null
})

export const selectOriginalFightCoords = createSelector([selectCurrentFight], fight => {
  return fight?.originCoords
})

export type LobbyActions =
  ReturnType<typeof receivedPlayers> |
  ReturnType<typeof changeHero> |
  ReturnType<typeof startGame> |
  ReturnType<typeof started> |
  ReturnType<typeof error>

export type GameActions =
  ReturnType<typeof receivedEnemies> |
  ReturnType<typeof playerTurn> |
  ReturnType<typeof moveToCoords> |
  ReturnType<typeof discoverTile> |
  ReturnType<typeof discoverChest> |
  ReturnType<typeof startFight> |
  ReturnType<typeof attack> |
  ReturnType<typeof attacked>

export default slice
