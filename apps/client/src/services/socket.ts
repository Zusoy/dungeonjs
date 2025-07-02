import { EventChannel } from 'redux-saga'
import { io, type Socket } from 'socket.io-client'
import { CreateRoomPayload, FailedToJoinRoomPayload, JoinedRoomPayload, JoinRoomPayload, LeaveRoomPayload, LeftRoomPayload } from 'features/Rooms/slice'
import type { ChangeHeroPayload, StartGamePayload, MoveToCoordsPayload, BeginFightPayload, AttackPayload, AttackResultPayload, ReceivedPlayersPayload, DiscoverTilePayload, PlayerTurnPayload, ReceivedSkeletonsPayload, ReceivedLootsPayload, LootPayload, ReceivedChestsPayload, PickChestPayload } from 'features/Game/slice'

export interface ServerToClients {
  pong: () => void
  players: (players: ReceivedPlayersPayload) => void
  enemies: (payload: ReceivedSkeletonsPayload) => void
  chests: (payload: ReceivedChestsPayload) => void
  loots: (payload: ReceivedLootsPayload) => void
  joinedRoom: (payload: JoinedRoomPayload) => void
  failedToJoinRoom: (payload: FailedToJoinRoomPayload) => void
  leftRoom: (reason: LeftRoomPayload) => void
  gameStarted: (roomId: string) => void
  playerTurn: (payload: PlayerTurnPayload) => void
  discoverTile: (payload: DiscoverTilePayload) => void
  startFight: (payload: BeginFightPayload) => void
  attacked: (payload: AttackResultPayload) => void
}

export interface ClientToServer {
  ping: () => void
  createRoom: (payload: CreateRoomPayload) => void
  joinRoom: (payload: JoinRoomPayload) => void
  leaveRoom: (payload: LeaveRoomPayload) => void
  changeHero: (payload: ChangeHeroPayload) => void
  startGame: (payload: StartGamePayload) => void
  moveToCoords: (payload: MoveToCoordsPayload) => void
  attack: (payload: AttackPayload) => void
  loot: (payload: LootPayload) => void
  pickChest: (payload: PickChestPayload) => void
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
