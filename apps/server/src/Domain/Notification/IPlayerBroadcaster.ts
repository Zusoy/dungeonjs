import type { Room } from 'Domain/Model/Room'

export interface IPlayerBroadcaster {
  /**
   * Broadcast players changes in the room
   */
  broadcast(room: Room): Promise<void>
}
