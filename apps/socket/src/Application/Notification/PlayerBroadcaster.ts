import { inject, injectable } from 'tsyringe'
import type { Room } from 'Domain/Model/Room'
import type { IPlayerBroadcaster } from 'Domain/Notification/IPlayerBroadcaster'
import type { IServer } from 'Domain/IServer'
import type { IPlayers } from 'Domain/Repository/IPlayers'

@injectable()
export class PlayerBroadcaster implements IPlayerBroadcaster {
  constructor(
    @inject('server')
    private readonly server: IServer,
    @inject('players')
    private readonly players: IPlayers
  ) { }

  broadcast(room: Room): void {
    this.server.fetchSocketIds(room)
      .then(ids => {
        const players = Array.from(ids)
          .map(id => this.players.find(id))
          .filter(p => !!p)
          .map(p => p.getRoomPayload(p.id === room.createdById))

        this.server.emitInRoom('players', room, { players })
      })
  }
}
