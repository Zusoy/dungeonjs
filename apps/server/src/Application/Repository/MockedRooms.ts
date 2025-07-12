import type { IRooms } from 'Domain/Repository/IRooms'
import type { Room } from 'Domain/Model/Room'
import type { Nullable } from 'utils'

export class MockedRooms implements IRooms {
  constructor(private rooms: Room[] = []) { }

  add(room: Room): void {
    this.rooms = [...this.rooms, room]
  }

  remove(room: Room): void {
    this.rooms = this.rooms.filter(r => r.roomId !== room.roomId)
  }

  update(item: Room): void {
    const index = this.rooms.findIndex(room => room.roomId === item.roomId)
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
}
