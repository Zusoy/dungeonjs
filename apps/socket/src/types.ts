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

export type Coords = [x: number, y: number]
export class Direction {
  public static readonly Left: VectorTuple = [-1, 0, 0]
  public static readonly Right: VectorTuple = [1, 0, 0]
  public static readonly Up: VectorTuple = [0, 0, -1]
  public static readonly Down: VectorTuple = [0, 0, 1]
  public static readonly All: VectorTuple[] = [
    Direction.Left,
    Direction.Right,
    Direction.Up,
    Direction.Down
  ]

  public static opposite(direction: VectorTuple): VectorTuple {
    const [x, _y, z] = direction

    if (x === -1) {
      return Direction.Right
    }

    if (x === 1) {
      return Direction.Left
    }

    if (z === -1) {
      return Direction.Down
    }

    if (z === 1) {
      return Direction.Up
    }

    return [0, 0, 0]
  }

  public static random(): VectorTuple {
    const index = Math.floor(Math.random() * Direction.All.length)
    return Direction.All[index]
  }
}

export type MoveToCoordsPayload = {
  readonly coords: Coords
  readonly neighborTiles: Tile[]
  readonly fromDirection: VectorTuple
  readonly uncharted: boolean
}

export type LeftRoomReason = 'user_left'|'room_deleted'

export enum TileType {
  Corridor = 'corridor',
  Room = 'room'
}

export type Tile = {
  readonly id: string
  readonly type: TileType
  readonly coords: Coords
  readonly directions: VectorTuple[]
}
