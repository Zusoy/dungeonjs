import { inject, injectable, registry } from 'tsyringe'
import type ICollection from 'Netcode/Collection/ICollection'
import type { ChangeHeroPayload, AppSocket } from 'types'
import type IEventHandler from 'IEventHandler'
import type Room from 'Netcode/Room'
import type User from 'Netcode/User'
import UserEmitter from 'Netcode/UserEmitter'

@injectable()
@registry([{ token: 'handlers', useClass: ChangeHeroHandler }])
export default class ChangeHeroHandler implements IEventHandler<'changeHero'> {
  constructor(
    @inject('users') private readonly users: ICollection<User>,
    @inject('rooms') private readonly rooms: ICollection<Room>,
    @inject('emitter.user') private readonly userEmitter: UserEmitter
  ) {
  }

  supports(event: 'changeHero', _payload: [payload: ChangeHeroPayload], socket: AppSocket): boolean {
    return event === 'changeHero'
      && socket.rooms.size > 0
  }

  handle(_event: 'changeHero', payload: [payload: ChangeHeroPayload], socket: AppSocket): void {
    const [changeHeroPayload] = payload
    const currentRoomId = Array.from(socket.rooms).find(room => !!this.rooms.find(room))

    if (!currentRoomId) {
      return
    }

    const room = this.rooms.find(currentRoomId)
    const user = this.users.find(socket.id)
    const index = Array.from(this.users).findIndex(({ id }) => id === socket.id)

    if (!room || !user || index < 0) {
      return
    }

    user.hero = changeHeroPayload.hero

    this.users.update(user, index)
    this.userEmitter.broadcast(room)
  }
}
