import { inject, injectable, registry } from 'tsyringe'
import { OperationDeniedError } from 'Domain/Error/OperationDeniedError'
import { ObjectNotFoundError } from 'Domain/Error/ObjectNotFoundError'
import { Coords } from 'Domain/Geometry/Coords'
import { PlayerNotInRoomError } from 'Domain/Error/PlayerNotInRoomError'
import type { PickChestEvent } from 'Domain/Event/PickChestEvent'
import type { IEventHandler } from 'Domain/EventHandler/IEventHandler'
import type { ISocket } from 'Domain/ISocket'
import type { IRooms } from 'Domain/Repository/IRooms'
import type { IPlayers } from 'Domain/Repository/IPlayers'
import type { IPlayerBroadcaster } from 'Domain/Notification/IPlayerBroadcaster'
import type { IServer } from 'Domain/IServer'

@injectable()
@registry([{ token: 'handlers', useClass: PickChestHandler }])
export class PickChestHandler implements IEventHandler<'pickChest'> {
  constructor(
    @inject('rooms')
    private readonly rooms: IRooms,
    @inject('players')
    private readonly players: IPlayers,
    @inject('players.broadcaster')
    private readonly broadcaster: IPlayerBroadcaster,
    @inject('server')
    private readonly server: IServer
  ) {}

  supports(channel: 'pickChest', _socket: ISocket, _event: PickChestEvent): boolean {
    return channel === 'pickChest'
  }

  handle(_channel: 'pickChest', socket: ISocket, event: PickChestEvent): void {
    const roomId = socket.room

    if (!roomId) {
      throw new PlayerNotInRoomError(socket.id)
    }

    const room = this.rooms.find(roomId)
    const roomIndex = Array.from(this.rooms).findIndex(room => room.roomId === roomId)

    const player = this.players.find(socket.id)
    const playerIndex = Array.from(this.players).findIndex(p => p.id === socket.id)

    if (!room) {
      throw new ObjectNotFoundError('Room', roomId)
    }

    if (!player) {
      throw new ObjectNotFoundError('Player', socket.id)
    }

    const chest = room.findChest(event.chestId)

    if (!chest) {
      throw new ObjectNotFoundError('Chest', event.chestId)
    }

    const playerCoords = Coords.fromScalar(player.coords)
    const chestCoords = Coords.fromScalar(chest.coords)

    if (!playerCoords.equals(chestCoords)) {
      throw new OperationDeniedError()
    }

    if (player.inventory.keys <= 0) {
      throw new OperationDeniedError()
    }

    room.removeChest(chest.id)
    this.rooms.update(room, roomIndex)

    player.removeKey()
    player.addTreasure()

    this.players.update(player, playerIndex)
    this.broadcaster.broadcast(room)

    this.server.emitInRoom('chests', room, { chests: room.getChests() })
  }
}
