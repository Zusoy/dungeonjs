import type { Server, Socket } from 'socket.io'
import type { ServerToClients, ClientToServer, InterServer } from 'Netcode/events'
import { Hero } from 'Netcode/User'

export type AppServer = Server<ClientToServer, ServerToClients, InterServer>
export type AppSocket = Socket<ClientToServer, ServerToClients, InterServer>

export type CreateRoomPayload = {
  roomId: string
}

export type JoinRoomPayload = {
  roomId: string
}

export type LeaveRoomPayload = {
  roomId: string
}

export type ChangeHeroPayload = {
  hero: Hero
}

export type LeftRoomReason = 'user_left'|'room_deleted'