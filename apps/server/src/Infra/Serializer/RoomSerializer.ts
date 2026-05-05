import { injectable } from 'tsyringe'
import { Room, RoomPayloadSchema } from 'Domain/Model/Room'
import type { ISerializer } from 'Infra/Serializer/ISerializer'

@injectable()
export class RoomSerializer implements ISerializer<Room> {
  serialize(value: string): Room {
    const type = RoomPayloadSchema.safeParse(JSON.parse(value))

    if (!type.success) {
      throw type.error
    }

    const roomPayload = type.data

    return new Room(
      roomPayload.roomId,
      roomPayload.createdById,
      roomPayload.enemies,
      roomPayload.loots,
      roomPayload.chests
    )
  }
}
