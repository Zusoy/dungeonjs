import ICollection from 'Netcode/Collection/ICollection'
import Room from 'Netcode/Room'

export default class RoomCollection implements ICollection<Room> {
  private rooms: Room[] = []

  add(item: Room): void {
    this.rooms = [...this.rooms, item]
  }

  remove(item: Room): void {
    this.rooms = this.rooms.filter(({ roomId }) => roomId !== item.roomId)
  }

  update(item: Room, index: number): void {
    this.rooms = this.rooms.map((room, i) => i === index ? item : room)
  }

  find(id: string): Room | null {
    return this.rooms.find(({ roomId }) => roomId === id) || null
  }

  *[Symbol.iterator](): IterableIterator<Room> {
    for (const room of this.rooms) {
      yield room
    }
  }
}
