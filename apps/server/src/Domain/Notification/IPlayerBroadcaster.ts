import type { Room } from 'Domain/Model/Room'

export interface IPlayerBroadcaster {
  broadcast(room: Room): void
}
