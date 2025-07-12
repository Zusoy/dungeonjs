import type { PlayerPayload } from 'Domain/Model/Player'
import type { Room } from 'Domain/Model/Room'
import type { ITurnAllocator } from 'Domain/Notification/ITurnAllocator'

export class MockedTurnAllocator implements ITurnAllocator {
  public readonly turnRoomAllocated: string[] = []

  allocateNextTurn(room: Room, _currentPlayerId: PlayerPayload['id']): void {
    this.turnRoomAllocated.push(room.roomId)
  }
}
