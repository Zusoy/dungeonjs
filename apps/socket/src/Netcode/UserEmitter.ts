import { inject, injectable } from 'tsyringe'
import type { AppServer } from 'types'
import type Room from 'Netcode/Room'
import type User from 'Netcode/User'
import type ICollection from 'Netcode/Collection/ICollection'

@injectable()
export default class UserEmitter {
  constructor(
    @inject('server') private readonly server: AppServer,
    @inject('users') private readonly users: ICollection<User>
  ) {}

  public broadcast(room: Room): void {
    this.server.in(room.roomId).fetchSockets()
      .then(sockets => {
        const players = sockets
          .map(({ id }) => id)
          .map(id => this.users.find(id))
          .filter(u => !!u)
          .map(u => u.getRoomPayload(u.id === room.createdById))

        this.server.in(room.roomId).emit('players', players)
      })
  }
}
