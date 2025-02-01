import AbstractEventHandler from 'AbstractEventHandler'
import { ChangeHeroPayload, AppSocket } from 'types'

export default class ChangeHeroHandler extends AbstractEventHandler<'changeHero'> {
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

    this.server.in(room.roomId).fetchSockets()
      .then(sockets => {
        const roomUsers = sockets
          .map(({ id }) => id)
          .map(id => this.users.find(id))
          .filter(u => !!u)
          .map(u => u.getRoomPayload(u.id === room.createdById))

        this.server.in(room.roomId).emit('players', roomUsers)
      })
  }
}
