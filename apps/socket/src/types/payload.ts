import { Hero } from 'Netcode/User'
import type { ScalarCoords } from 'types/coords'
import type { VectorTuple } from 'types/utils'
import type { Tile } from 'types/tile'

export type LeftRoomReason = 'user_left'|'room_deleted'

export type CreateRoomPayload = {
  readonly roomId: string
}

export type JoinRoomPayload = {
  readonly roomId: string
}

export type LeaveRoomPayload = {
  readonly roomId: string
}

export type ChangeHeroPayload = {
  readonly hero: Hero
}

export type StartGamePayload = {
  readonly roomId: string
}

export type MoveToCoordsPayload = {
  readonly coords: ScalarCoords
  readonly neighborTiles: Tile[]
  readonly fromDirection: VectorTuple
  readonly uncharted: boolean
}