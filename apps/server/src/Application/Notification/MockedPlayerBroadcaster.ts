import type { Room } from 'Domain/Model/Room'
import type { IPlayerBroadcaster } from 'Domain/Notification/IPlayerBroadcaster'

export class MockedPlayerBroadcaster implements IPlayerBroadcaster {
  public readonly broadcastedRooms: string[] = []

  broadcast(room: Room): void {
    this.broadcastedRooms.push(room.roomId)
  }
}
