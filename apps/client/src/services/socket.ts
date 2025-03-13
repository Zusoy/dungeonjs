import type { UserPayload } from 'types/user'
import type { Tile } from 'types/tile'
import { EventChannel } from 'redux-saga'
import { io, type Socket } from 'socket.io-client'
import { CreateRoomPayload, JoinRoomPayload, LeaveRoomPayload } from 'features/Rooms/slice'
import { ChangeHeroPayload, StartGamePayload, MoveToCoordsPayload } from 'features/Game/slice'

export type LeftRoomReason = 'user_left'|'room_deleted'

export interface ServerToClients {
  pong: () => void
  availableRooms: (rooms: Iterable<string>) => void
  players: (players: Iterable<UserPayload>) => void
  joinedRoom: (room: string) => void
  leftRoom: (reason: LeftRoomReason) => void
  gameStarted: (roomId: string) => void
  playerTurn: (playerId: UserPayload['id']) => void
  discoverTile: (payload: Tile) => void
}

export interface ClientToServer {
  ping: () => void
  createRoom: (payload: CreateRoomPayload) => void
  joinRoom: (payload: JoinRoomPayload) => void
  leaveRoom: (payload: LeaveRoomPayload) => void
  changeHero: (payload: ChangeHeroPayload) => void
  startGame: (payload: StartGamePayload) => void
  moveToCoords: (payload: MoveToCoordsPayload) => void
}

export type AppSocket = Socket<ServerToClients, ClientToServer>

type NotUndefined = object | null
export type SocketChannel<T extends NotUndefined> = (socket: AppSocket) => EventChannel<T>

export const createWebsocketConnection = (username: string): Promise<AppSocket> => {
  return new Promise((resolve, reject) => {
    const socket: AppSocket = io('http://127.0.0.1:8080', {
      transports: ['websocket'],
      autoConnect: false,
      query: {
        username
      }
    })

    socket.on('connect', () => {
      resolve(socket)
    })

    socket.on('connect_error', error => {
      reject(error)
    })

    socket.connect()
  })
}
