import type { PlayerPayload } from 'Domain/Model/Player'
import type { Room } from 'Domain/Model/Room'
import type { ITurnAllocator } from 'Domain/Notification/ITurnAllocator'

export class MockedTurnAllocator implements ITurnAllocator {
  public readonly turnRoomAllocated: string[] = []
  public readonly allocatedTurns: string[] = []

  async allocateNextTurn(room: Room, _currentPlayerId: PlayerPayload['id']): Promise<void> {
    this.turnRoomAllocated.push(room.roomId)
  }

  async allocateTurn(_room: Room, playerId: PlayerPayload['id']): Promise<void> {
    this.allocatedTurns.push(playerId)
  }
}
