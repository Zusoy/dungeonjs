import type { Room } from 'Domain/Model/Room'
import type { Nullable } from 'utils'

export interface IRooms extends Iterable<Room> {
  add(room: Room): void
  remove(room: Room): void
  update(room: Room, index: number): void
  find(roomId: Room['roomId']): Nullable<Room>
}
