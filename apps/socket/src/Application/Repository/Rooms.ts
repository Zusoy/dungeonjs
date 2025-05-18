import { injectable, type Disposable as IDisposable } from 'tsyringe'
import type { Room } from 'Domain/Model/Room'
import type { IRooms } from 'Domain/Repository/IRooms'
import type { Nullable } from 'utils'

@injectable()
export class Rooms implements IRooms, IDisposable {
  private rooms: Room[] = []

  add(room: Room): void {
    this.rooms = [...this.rooms, room]
  }

  remove(room: Room): void {
    this.rooms = this.rooms.filter(r => r.roomId !== room.roomId)
  }

  update(item: Room, index: number): void {
    this.rooms = this.rooms.map((room, i) => i === index ? item : room)
  }

  find(roomId: Room['roomId']): Nullable<Room> {
    return this.rooms.find(room => roomId === room.roomId) || null
  }

  *[Symbol.iterator](): IterableIterator<Room> {
    for (const room of this.rooms) {
      yield room
    }
  }

  dispose(): Promise<void> | void {
    this.rooms = []
  }
}
