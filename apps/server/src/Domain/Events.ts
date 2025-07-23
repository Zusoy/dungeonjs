import * as Events from 'Domain/Event'

export interface ClientToServer {
  createRoom: (event: Events.CreateRoomEvent) => void
  endTurn: (event: Events.EndTurnEvent) => void
  joinRoom: (event: Events.JoinRoomEvent) => void
  leaveRoom: (event: Events.LeaveRoomEvent) => void
  changeHero: (event: Events.ChangeHeroEvent) => void
  startGame: (event: Events.StartGameEvent) => void
  moveToCoords: (event: Events.MoveEvent) => void
  attack: (event: Events.AttackEvent) => void
  loot: (event: Events.LootEvent) => void
  pickChest: (event: Events.PickChestEvent) => void
}

export const clientToServerEvents: (keyof ClientToServer)[] = [
  'createRoom',
  'endTurn',
  'joinRoom',
  'leaveRoom',
  'changeHero',
  'startGame',
  'moveToCoords',
  'attack',
  'loot',
  'pickChest'
]

export interface ServerToClients {
  players: (event: Events.PlayersEvent) => void
  enemies: (event: Events.SkeletonsEvent) => void
  loots: (event: Events.LootsEvent) => void
  chests: (event: Events.ChestsEvent) => void
  joinedRoom: (event: Events.JoinedRoomEvent) => void
  failedToJoinRoom: (event: Events.FailedToJoinRoomEvent) => void
  leftRoom: (event: Events.LeftRoomEvent) => void
  gameStarted: (event: Events.GameStartedEvent) => void
  playerTurn: (event: Events.PlayerTurnEvent) => void
  discoverTile: (event: Events.DiscoverTileEvent) => void
  startFight: (event: Events.StartFightEvent) => void
  attacked: (event: Events.AttackResultEvent) => void
}

export interface InterServer {
}

export type EventsMap = ClientToServer & ServerToClients & InterServer
