import { injectable } from 'tsyringe'
import { Player, PlayerPayloadSchema } from 'Domain/Model/Player'
import type { ISerializer } from 'Infra/Serializer/ISerializer'

@injectable()
export class PlayerSerializer implements ISerializer<Player> {
  serialize(value: string): Player {
    const type = PlayerPayloadSchema.safeParse(JSON.parse(value))

    if (!type.success) {
      throw type.error
    }

    const playerPayload = type.data

    return new Player(
      playerPayload.id,
      playerPayload.username,
      playerPayload.color,
      playerPayload.hero,
      playerPayload.inventory,
      playerPayload.position,
      playerPayload.rotation,
      playerPayload.coords,
      playerPayload.movesCount
    )
  }
}
