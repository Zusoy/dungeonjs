import { EventChannel } from 'redux-saga'
import { io, type Socket } from 'socket.io-client'
import type {
  CreateRoomPayload,
  FailedToJoinRoomPayload,
  JoinedRoomPayload,
  JoinRoomPayload,
  LeaveRoomPayload,
  LeftRoomPayload
} from 'features/Rooms/application/slice'
import type {
  ChangeHeroPayload,
  StartGamePayload,
  MoveToCoordsPayload,
  ReceivedPlayersPayload,
  DiscoverTilePayload,
  PlayerTurnPayload,
  ReceivedSkeletonsPayload,
  ReceivedLootsPayload,
  LootPayload,
  ReceivedChestsPayload,
  PickChestPayload,
  EndTurnPayload,
  GameEndedPayload
} from 'features/Game/Dungeon/application/slice'
import type { EngageCombatPayload, CombatResolvedPayload, AttackPayload } from 'features/Game/Combat/application/slice'

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
  engageCombat: (payload: EngageCombatPayload) => void
  combatResolved: (payload: CombatResolvedPayload) => void
  gameEnded: (payload: GameEndedPayload) => void
}

export interface ClientToServer {
  ping: () => void
  createRoom: (payload: CreateRoomPayload) => void
  joinRoom: (payload: JoinRoomPayload) => void
  leaveRoom: (payload: LeaveRoomPayload) => void
  changeHero: (payload: ChangeHeroPayload) => void
  startGame: (payload: StartGamePayload) => void
  moveToCoords: (payload: MoveToCoordsPayload) => void
  loot: (payload: LootPayload) => void
  pickChest: (payload: PickChestPayload) => void
  endTurn: (payload: EndTurnPayload) => void
  attack: (payload: AttackPayload) => void
}

export type AppSocket = Socket<ServerToClients, ClientToServer>

type NotUndefined = object | null
export type SocketChannel<T extends NotUndefined> = (socket: AppSocket) => EventChannel<T>

export const createWebsocketConnection = (username: string): Promise<AppSocket> => {
  return new Promise((resolve, reject) => {
    const socket: AppSocket = io('http://192.168.1.14:8080', {
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
