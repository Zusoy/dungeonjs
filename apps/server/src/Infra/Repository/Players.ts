import { inject, injectable } from 'tsyringe'
import type { IPlayers as IPlayerRepository } from 'Domain/Repository/IPlayers'
import type { Client } from 'Infra/Redis/Client/Client'
import { Player, PlayerPayload } from 'Domain/Model/Player'
import { Nullable } from 'utils'
import { BROKER, PLAYER_SERIALIZER } from 'Domain/tokens'
import { PlayerSerializer } from 'Infra/Serializer/PlayerSerializer'

@injectable()
export class Players implements IPlayerRepository {
  constructor(
    @inject(BROKER)
    private readonly client: Client,
    @inject(PLAYER_SERIALIZER)
    private readonly serializer: PlayerSerializer
  ) {}

  async add(player: Player): Promise<void> {
    await this.client.hSet(`player:${player.id}`, 'data', JSON.stringify(player))
    await this.client.addIndex('players', player.id)
  }

  async remove(player: Player): Promise<void> {
    await this.client.delete(`player:${player.id}`)
    await this.client.removeIndex('players', player.id)
  }

  async update(player: Player): Promise<void> {
    await this.client.hSet(`player:${player.id}`, 'data', JSON.stringify(player))
  }

  async find(playerId: PlayerPayload['id']): Promise<Nullable<Player>> {
    const data = await this.client.hGet<{ data: string }>(`player:${playerId}`)

    if (!data) {
      return Promise.resolve(null)
    }

    return Promise.resolve(this.serializer.serialize(data.data))
  }
}
