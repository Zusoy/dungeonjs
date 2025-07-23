import type { Selector } from 'app/store'
import type { Hero, UserPayload } from 'types/user'
import type { Skeleton } from 'types/enemy'
import type { ScalarCoords } from 'types/coords'
import type { Tile } from 'types/tile'
import type { Chest } from 'types/object'
import type { WorldLoot } from 'types/loot'
import type { Nullable, VectorTuple } from 'types/utils'
import { Direction } from 'types/utils'
import { TileType } from 'types/tile'
import { LootType } from 'types/loot'
import { WeaponType } from 'types/user'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { selectPlayers } from 'features/Lobby/application/slice'
import { selectId } from 'features/Authentication/application/slice'

type Fight = {
  readonly playerId: UserPayload['id']
  readonly enemyId: Skeleton['id']
  readonly originCoords: ScalarCoords
}

export type State = {
  enemies: Skeleton[]
  tiles: Tile[]
  chests: Chest[]
  loots: WorldLoot[]
  playerTurn: Nullable<UserPayload['id']>
  fight: Nullable<Fight>
  focusedCoords: Nullable<ScalarCoords>
}

export const initialState: State = {
  enemies: [],
  tiles: [
    { id: 'start_01', type: TileType.Room, directions: Direction.All, coords: [0, 0] }
  ],
  chests: [],
  loots: [],
  playerTurn: null,
  fight: null,
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

export type LootPayload = {
  readonly lootId: string
}

export type PickChestPayload = {
  readonly chestId: string
}

export type ReceivedPlayersPayload = {
  readonly players: UserPayload[]
}

export type ReceivedLootsPayload = {
  readonly loots: WorldLoot[]
}

export type ReceivedChestsPayload = {
  readonly chests: Chest[]
}

export type ReceivedSkeletonsPayload = {
  readonly skeletons: Skeleton[]
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

export type EndTurnPayload = {
  readonly timestamp: number
}

const slice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    receivedLoots: (state, action: PayloadAction<ReceivedLootsPayload>) => ({
      ...state,
      loots: action.payload.loots
    }),
    receivedEnemies: (state, action: PayloadAction<ReceivedSkeletonsPayload>) => ({
      ...state,
      enemies: action.payload.skeletons
    }),
    receivedChests: (state, action: PayloadAction<ReceivedChestsPayload>) => ({
      ...state,
      chests: action.payload.chests
    }),
    playerTurn: (state, action: PayloadAction<PlayerTurnPayload>) => ({
      ...state,
      playerTurn: action.payload.playerId
    }),
    moveToCoords: (state, _action: PayloadAction<MoveToCoordsPayload>) => ({
      ...state
    }),
    discoverTile: (state, action: PayloadAction<DiscoverTilePayload>) => ({
      ...state,
      tiles: [...state.tiles, action.payload.tile]
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
    loot: (state, _action: PayloadAction<LootPayload>) => ({
      ...state
    }),
    pickChest: (state, _action: PayloadAction<PickChestPayload>) => ({
      ...state,
    }),
    attacked: (state, _action: PayloadAction<AttackResultPayload>) => ({
      ...state,
      fight: null
    }),
    endTurn: (state, _action: PayloadAction<EndTurnPayload>) => ({
      ...state,
    })
  }
})

export const {
  receivedChests,
  receivedEnemies,
  receivedLoots,
  playerTurn,
  moveToCoords,
  discoverTile,
  focusCoords,
  startFight,
  attack,
  loot,
  pickChest,
  attacked,
  endTurn
} = slice.actions

export const selectIsPlayerTurn: Selector<boolean> = state =>
  state.game.playerTurn === state.auth.id

export const selectPlayerTurn: Selector<State['playerTurn']> = state =>
  state.game.playerTurn

export const selectTiles: Selector<Tile[]> = state =>
  state.game.tiles

export const selectChests: Selector<Chest[]> = state =>
  state.game.chests

export const selectLoots: Selector<WorldLoot[]> = state =>
  state.game.loots

export const selectKeyLoots = createSelector(
  [selectLoots],
  loots => loots.filter(loot => loot.itemType === LootType.Key)
)

export const selectWeaponLoots = createSelector(
  [selectLoots],
  loots => loots.filter(loot => loot.itemType === LootType.Weapon)
)

export const selectAxeLoots = createSelector(
  [selectWeaponLoots],
  weapons => weapons.filter(weapon => weapon.item.type === WeaponType.Axe)
)

export const selectSwordLoots = createSelector(
  [selectWeaponLoots],
  weapons => weapons.filter(weapon => weapon.item.type === WeaponType.Sword)
)

export const selectDaggerLoots = createSelector(
  [selectWeaponLoots],
  weapons => weapons.filter(weapon => weapon.item.type === WeaponType.Dagger)
)

export const selectCurrentPlayerTurn = createSelector(
  [selectPlayers, selectPlayerTurn],
  (players, playerTurnId) => players.find(player => player.id === playerTurnId)
)

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

export const selectLootInCurrentCoords = createSelector(
  [selectCurrentPlayer, selectLoots],
  (player, loots) => loots.find(loot => loot.coords[0] === player.coords[0] && loot.coords[1] === player.coords[1])
)

export const selectChestInCurrentCoords = createSelector(
  [selectCurrentPlayer, selectChests],
  (player, chests) => chests.find(chest => chest.coords[0] === player.coords[0] && chest.coords[1] === player.coords[1])
)

export type GameActions =
  ReturnType<typeof slice.actions.playerTurn> |
  ReturnType<typeof slice.actions.discoverTile> |
  ReturnType<typeof slice.actions.receivedChests> |
  ReturnType<typeof slice.actions.startFight> |
  ReturnType<typeof slice.actions.attacked> |
  ReturnType<typeof slice.actions.receivedEnemies> |
  ReturnType<typeof slice.actions.receivedLoots>

export default slice
