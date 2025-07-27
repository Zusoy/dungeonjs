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
import { WeaponType } from 'types/weapon'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { selectPlayers } from 'features/Lobby/application/slice'
import { selectId } from 'features/Authentication/application/slice'

export type State = {
  enemies: Skeleton[]
  tiles: Tile[]
  chests: Chest[]
  loots: WorldLoot[]
  playerTurn: Nullable<UserPayload['id']>
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

export type EndTurnPayload = {
  readonly timestamp: number
}

const slice = createSlice({
  name: 'dungeon',
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
    loot: (state, _action: PayloadAction<LootPayload>) => ({
      ...state
    }),
    pickChest: (state, _action: PayloadAction<PickChestPayload>) => ({
      ...state,
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
  loot,
  pickChest,
  endTurn
} = slice.actions

export const selectIsPlayerTurn: Selector<boolean> = state =>
  state.dungeon.playerTurn === state.auth.id

export const selectPlayerTurn: Selector<State['playerTurn']> = state =>
  state.dungeon.playerTurn

export const selectTiles: Selector<Tile[]> = state =>
  state.dungeon.tiles

export const selectChests: Selector<Chest[]> = state =>
  state.dungeon.chests

export const selectLoots: Selector<WorldLoot[]> = state =>
  state.dungeon.loots

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
  state.dungeon.enemies

export const selectFocusedCoords: Selector<Nullable<ScalarCoords>> = state =>
  state.dungeon.focusedCoords

export const selectCurrentPlayer = createSelector(
  [selectPlayers, selectId],
  (players, id) => players.find(p => p.id === id)!
)

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
  ReturnType<typeof slice.actions.receivedEnemies> |
  ReturnType<typeof slice.actions.receivedLoots>

export default slice
