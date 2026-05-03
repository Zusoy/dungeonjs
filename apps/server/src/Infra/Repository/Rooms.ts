import { inject, injectable } from 'tsyringe'
import type { IRooms as IRoomRepository } from 'Domain/Repository/IRooms'
import type { Client } from 'Infra/Redis/Client/Client'
import { BROKER, ROOM_SERIALIZER } from 'Domain/tokens'
import { Room } from 'Domain/Model/Room'
import { Nullable } from 'utils'
import { Player } from 'Domain/Model/Player'
import { RoomSerializer } from 'Infra/Serializer/RoomSerializer'

@injectable()
export class Rooms implements IRoomRepository {
  constructor(
    @inject(BROKER)
    private readonly client: Client,
    @inject(ROOM_SERIALIZER)
    private readonly serializer: RoomSerializer
  ) {}

  async add(room: Room): Promise<void> {
    await this.client.hSet(`room:${room.roomId}`, 'data', JSON.stringify(room))
    await this.client.addIndex('rooms', room.roomId)
    await this.client.addIndex(`rooms:byAuthor:${room.createdById}`, room.roomId);
  }

  async remove(room: Room): Promise<void> {
    await this.client.delete(`room:${room.roomId}`)
    await this.client.removeIndex('rooms', room.roomId)
    await this.client.removeIndex(`rooms:byAuthor:${room.createdById}`, room.roomId)
  }

  async update(room: Room): Promise<void> {
    await this.client.hSet(`room:${room.roomId}`, 'data', JSON.stringify(room))
  }

  async find(roomId: Room['roomId']): Promise<Nullable<Room>> {
    const data = await this.client.hGet<{ data: string }>(`room:${roomId}`)

    if (!data) {
      return Promise.resolve(null)
    }

    return Promise.resolve(this.serializer.serialize(data.data))
  }

  async findByAuthorId(authorId: Player['id']): Promise<Room[]> {
    const ids = await this.client.getIndex(`rooms:byAuthor:${authorId}`);

    if (!ids.length) {
      return Promise.resolve([])
    }

    return (await Promise.all(ids.map(id => this.find(id)))).filter(r => !!r)
  }
}
