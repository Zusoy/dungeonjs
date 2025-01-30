import type { UserPayload } from 'Netcode/User'
import type {
  CreateRoomPayload,
  JoinRoomPayload,
  LeaveRoomPayload,
  LeftRoomReason,
  ChangeHeroPayload
} from 'types'

export interface ClientToServer {
  ping: () => void
  createRoom: (payload: CreateRoomPayload) => void
  joinRoom: (payload: JoinRoomPayload) => void
  leaveRoom: (payload: LeaveRoomPayload) => void
  changeHero: (payload: ChangeHeroPayload) => void
}

export const clientToServerEvents: (keyof ClientToServer)[] = [
  'ping',
  'createRoom',
  'joinRoom',
  'leaveRoom',
  'changeHero'
]

export interface ServerToClients {
  pong: () => void
  availableRooms: (rooms: Iterable<string>) => void
  players: (players: Iterable<UserPayload>) => void
  joinedRoom: (room: string) => void
  leftRoom: (reason: LeftRoomReason) => void
}

export interface InterServer {
}
