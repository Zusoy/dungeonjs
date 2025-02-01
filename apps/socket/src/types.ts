import type { Server, Socket } from 'socket.io'
import type { ServerToClients, ClientToServer, InterServer } from 'Netcode/events'
import { Hero } from 'Netcode/User'

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

export type LeftRoomReason = 'user_left'|'room_deleted'