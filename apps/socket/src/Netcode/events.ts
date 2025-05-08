import type { UserPayload } from 'Netcode/User'
import type { Tile } from 'types/tile'
import type { Chest } from 'types/object'
import type { Skeleton } from 'types/enemy'
import type {
  CreateRoomPayload,
  JoinRoomPayload,
  LeaveRoomPayload,
  ChangeHeroPayload,
  StartGamePayload,
  MoveToCoordsPayload,
  LeftRoomReason,
  BeginFightPayload,
  FailedToJoinRoomPayload
} from 'types/payload'

export interface ClientToServer {
  ping: () => void
  createRoom: (payload: CreateRoomPayload) => void
  joinRoom: (payload: JoinRoomPayload) => void
  leaveRoom: (payload: LeaveRoomPayload) => void
  changeHero: (payload: ChangeHeroPayload) => void
  startGame: (payload: StartGamePayload) => void
  moveToCoords: (payload: MoveToCoordsPayload) => void
}

export const clientToServerEvents: (keyof ClientToServer)[] = [
  'ping',
  'createRoom',
  'joinRoom',
  'leaveRoom',
  'changeHero',
  'startGame',
  'moveToCoords'
]

export interface ServerToClients {
  pong: () => void
  players: (players: Iterable<UserPayload>) => void
  joinedRoom: (room: string) => void
  failedToJoinRoom: (payload: FailedToJoinRoomPayload) => void
  leftRoom: (reason: LeftRoomReason) => void
  gameStarted: (roomId: string) => void
  playerTurn: (playerId: UserPayload['id']) => void
  discoverTile: (payload: Tile) => void
  discoverChest: (payload: Chest) => void
  discoverEnemy: (payload: Skeleton) => void
  startFight: (payload: BeginFightPayload) => void
}

export interface InterServer {
}

export type EventsMap = ClientToServer & ServerToClients & InterServer
