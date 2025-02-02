import type { Server, Socket } from 'socket.io'
import type { ServerToClients, ClientToServer, InterServer } from 'Netcode/events'
import { Hero, VectorTuple } from 'Netcode/User'

export type AppServer = Server<ClientToServer, ServerToClients, InterServer>
export type AppSocket = Socket<ClientToServer, ServerToClients, InterServer>

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

export type MoveToDirectionPayload = {
  readonly direction: VectorTuple
  readonly neighborsTiles: ITile[]
}

export type LeftRoomReason = 'user_left'|'room_deleted'

export type Coords = [x: number, y: number]

export enum TileType {
  Corridor = 'corridor',
  Room = 'room'
}

export interface ITile {
  readonly type: TileType
  readonly coords: Coords
  readonly position: VectorTuple
  readonly rotation: VectorTuple
  readonly directions: VectorTuple[]
}

export class CorridorTile implements ITile {
  public readonly type = TileType.Corridor

  constructor(
    public readonly coords: Coords,
    public readonly position: VectorTuple,
    public readonly rotation: VectorTuple,
    public readonly directions: VectorTuple[]
  ) {}
}

export class RoomTile implements ITile {
  public readonly type = TileType.Room

  constructor(
    public readonly coords: Coords,
    public readonly position: VectorTuple,
    public readonly rotation: VectorTuple,
    public readonly directions: VectorTuple[]
  ) {}
}

export type Tiles =
  CorridorTile |
  RoomTile
