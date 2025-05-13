import { Hero, UserPayload } from 'Netcode/User'
import type { ScalarCoords } from 'types/coords'
import type { VectorTuple } from 'types/utils'
import type { Tile } from 'types/tile'
import type { Skeleton } from 'types/enemy'

export type LeftRoomReason = 'user_left'|'room_deleted'
export type JoinRoomErrorCode = 'room_not_found'

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

export type BeginFightPayload = {
  readonly playerId: UserPayload['id']
  readonly enemyId: Skeleton['id']
  readonly originCoords: ScalarCoords
}

export type AttackPayload = {
  readonly enemyId: string
  readonly originCoords: ScalarCoords
}

export type AttackResultPayload = {
  readonly attack: number
  readonly succeed: boolean
}

export type FailedToJoinRoomPayload = {
  readonly roomId: string
  readonly code: JoinRoomErrorCode
}
