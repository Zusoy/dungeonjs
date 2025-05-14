import * as Events from 'Domain/Event'

export interface ClientToServer {
  createRoom: (event: Events.CreateRoomEvent) => void
  joinRoom: (event: Events.JoinRoomEvent) => void
  leaveRoom: (event: Events.LeaveRoomEvent) => void
  changeHero: (event: Events.ChangeHeroEvent) => void
  startGame: (event: Events.StartGameEvent) => void
  moveToCoords: (event: Events.MoveEvent) => void
  attack: (event: Events.AttackEvent) => void
}

export const clientToServerEvents: (keyof ClientToServer)[] = [
  'createRoom',
  'joinRoom',
  'leaveRoom',
  'changeHero',
  'startGame',
  'moveToCoords',
  'attack'
]

export interface ServerToClients {
  players: (event: Events.PlayersEvent) => void
  enemies: (event: Events.SkeletonsEvent) => void
  joinedRoom: (event: Events.JoinedRoomEvent) => void
  failedToJoinRoom: (event: Events.FailedToJoinRoomEvent) => void
  leftRoom: (event: Events.LeftRoomEvent) => void
  gameStarted: (event: Events.GameStartedEvent) => void
  playerTurn: (event: Events.PlayerTurnEvent) => void
  discoverTile: (event: Events.DiscoverTileEvent) => void
  discoverChest: (event: Events.DiscoverChestEvent) => void
  startFight: (event: Events.StartFightEvent) => void
  attacked: (event: Events.AttackResultEvent) => void
}

export interface InterServer {
}

export type EventsMap = ClientToServer & ServerToClients & InterServer
