import type { Room } from 'Domain/Model/Room'
import type { PlayerPayload } from 'Domain/Model/Player'

export interface ITurnAllocator {
  allocateNextTurn(room: Room, currentPlayerId: PlayerPayload['id']): Promise<void>
  allocateTurn(room: Room, playerId: PlayerPayload['id']): Promise<void>
}
