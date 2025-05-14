import { inject, injectable, registry } from 'tsyringe'
import type { ChangeHeroEvent } from 'Domain/Event/ChangeHeroEvent'
import type { IEventHandler } from 'Domain/EventHandler/IEventHandler'
import type { ISocket } from 'Domain/ISocket'
import type { IPlayers } from 'Domain/Repository/IPlayers'
import type { IRooms } from 'Domain/Repository/IRooms'
import type { IPlayerBroadcaster } from 'Domain/Notification/IPlayerBroadcaster'

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

  handle(_channel: 'changeHero', socket: ISocket, event: ChangeHeroEvent): void {
    const currentRoomId = socket.rooms.find(room => !!this.rooms.find(room))

    if (!currentRoomId) {
      return
    }

    const room = this.rooms.find(currentRoomId)
    const user = this.players.find(socket.id)
    const index = Array.from(this.players).findIndex(({ id }) => id === socket.id)

    if (!room || !user || index < 0) {
      return
    }

    user.hero = event.hero

    this.players.update(user, index)
    this.broadcaster.broadcast(room)
  }
}
