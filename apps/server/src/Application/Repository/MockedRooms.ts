import type { IRooms } from 'Domain/Repository/IRooms'
import type { Room } from 'Domain/Model/Room'
import type { Nullable } from 'utils'
import type { Player } from 'Domain/Model/Player'

export class MockedRooms implements IRooms {
  constructor(private rooms: Room[] = []) { }

  async add(room: Room): Promise<void> {
    this.rooms = [...this.rooms, room]
  }

  async remove(room: Room): Promise<void> {
    this.rooms = this.rooms.filter(r => r.roomId !== room.roomId)
  }

  async update(item: Room): Promise<void> {
    const index = this.rooms.findIndex(room => room.roomId === item.roomId)
    this.rooms = this.rooms.map((room, i) => i === index ? item : room)
  }

  find(roomId: Room['roomId']): Promise<Nullable<Room>> {
    return Promise.resolve(this.rooms.find(room => roomId === room.roomId) || null)
  }

  findByAuthorId(authorId: Player['id']): Promise<Room[]> {
    return Promise.resolve(this.rooms.filter(room => room.createdById === authorId))
  }
}
