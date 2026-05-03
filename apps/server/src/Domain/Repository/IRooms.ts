import { Player } from 'Domain/Model/Player'
import type { Room } from 'Domain/Model/Room'
import type { Nullable } from 'utils'

export interface IRooms {
  add(room: Room): Promise<void>
  remove(room: Room): Promise<void>
  update(room: Room): Promise<void>
  find(roomId: Room['roomId']): Promise<Nullable<Room>>
  findByAuthorId(authorId: Player['id']): Promise<Room[]>
}
