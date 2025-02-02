import { EventChannel } from 'redux-saga'
import { io, type Socket } from 'socket.io-client'
import { CreateRoomPayload, JoinRoomPayload, LeaveRoomPayload } from 'features/Rooms/slice'
import { ChangeHeroPayload, StartGamePayload } from 'features/Game/slice'

export type LeftRoomReason = 'user_left'|'room_deleted'
export type VectorTuple = [x: number, y: number, z: number]

export enum Hero {
  Rogue = 'rogue',
  Knight = 'knight',
  Mage = 'mage',
  Barbarian = 'barbarian'
}

export type UserPayload = {
  readonly id: string
  readonly username: string
  readonly color: string
  readonly hero: Hero
  readonly position: VectorTuple
  readonly rotation: VectorTuple
  readonly host?: boolean
}

export interface ServerToClients {
  pong: () => void
  availableRooms: (rooms: Iterable<string>) => void
  players: (players: Iterable<UserPayload>) => void
  joinedRoom: (room: string) => void
  leftRoom: (reason: LeftRoomReason) => void
  gameStarted: (roomId: string) => void
  playerTurn: (playerId: UserPayload['id']) => void
}

export interface ClientToServer {
  ping: () => void
  createRoom: (payload: CreateRoomPayload) => void
  joinRoom: (payload: JoinRoomPayload) => void
  leaveRoom: (payload: LeaveRoomPayload) => void
  changeHero: (payload: ChangeHeroPayload) => void
  startGame: (payload: StartGamePayload) => void
}

export type AppSocket = Socket<ServerToClients, ClientToServer>

type NotUndefined = object | null
export type SocketChannel<T extends NotUndefined> = (socket: AppSocket) => EventChannel<T>

export const createWebsocketConnection = (username: string): Promise<AppSocket> => {
  return new Promise((resolve, reject) => {
    const socket: AppSocket = io('http://192.168.1.13:8080', {
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
