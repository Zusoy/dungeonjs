import type { Room } from 'Domain/Model/Room'
import type { IPlayerBroadcaster } from 'Domain/Notification/IPlayerBroadcaster'

export class MockedPlayerBroadcaster implements IPlayerBroadcaster {
  public readonly broadcastedRooms: string[] = []

  async broadcast(room: Room): Promise<void> {
    this.broadcastedRooms.push(room.roomId)
  }
}
