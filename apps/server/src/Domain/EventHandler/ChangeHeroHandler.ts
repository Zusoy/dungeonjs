import { inject, injectable, registry } from 'tsyringe'
import type { ChangeHeroEvent } from 'Domain/Event/ChangeHeroEvent'
import type { IEventHandler } from 'Domain/EventHandler/IEventHandler'
import type { ISocket } from 'Domain/ISocket'
import type { IPlayers } from 'Domain/Repository/IPlayers'
import type { IRooms } from 'Domain/Repository/IRooms'
import type { IPlayerBroadcaster } from 'Domain/Notification/IPlayerBroadcaster'
import { ObjectNotFoundError } from 'Domain/Error/ObjectNotFoundError'
import { PlayerNotInRoomError } from 'Domain/Error/PlayerNotInRoomError'

@injectable()
@registry([{ token: 'handlers', useClass: ChangeHeroHandler }])
export class ChangeHeroHandler implements IEventHandler<'changeHero'> {
  constructor(
    @inject('players')
    private readonly players: IPlayers,
    @inject('rooms')
    private readonly rooms: IRooms,
    @inject('players.broadcaster')
    private readonly broadcaster: IPlayerBroadcaster
  ) {
  }

  supports(channel: 'changeHero', _socket: ISocket, _event: ChangeHeroEvent): boolean {
    return channel === 'changeHero'
  }

  async handle(_channel: 'changeHero', socket: ISocket, event: ChangeHeroEvent): Promise<void> {
    const roomId = socket.room

    if (!roomId) {
      throw new PlayerNotInRoomError(socket.id)
    }

    const room = this.rooms.find(roomId)

    if (!room) {
      throw new ObjectNotFoundError("Room", roomId)
    }

    const player = this.players.find(socket.id)

    if (!player) {
      throw new ObjectNotFoundError("Player", socket.id)
    }

    player.hero = event.hero
    this.players.update(player)
    this.broadcaster.broadcast(room)
  }
}
