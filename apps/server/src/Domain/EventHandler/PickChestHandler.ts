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
import { ChestsEvent } from 'Domain/Event/ChestsEvent'
import { BROADCASTER, HANDLERS, PLAYERS, ROOMS, SERVER } from 'Domain/tokens'

@injectable()
@registry([{ token: HANDLERS, useClass: PickChestHandler }])
export class PickChestHandler implements IEventHandler<'pickChest'> {
  constructor(
    @inject(ROOMS)
    private readonly rooms: IRooms,
    @inject(PLAYERS)
    private readonly players: IPlayers,
    @inject(BROADCASTER)
    private readonly broadcaster: IPlayerBroadcaster,
    @inject(SERVER)
    private readonly server: IServer
  ) {}

  supports(channel: 'pickChest', _socket: ISocket, _event: PickChestEvent): boolean {
    return channel === 'pickChest'
  }

  async handle(_channel: 'pickChest', socket: ISocket, event: PickChestEvent): Promise<void> {
    const roomId = socket.room

    if (!roomId) {
      throw new PlayerNotInRoomError(socket.id)
    }

    const room = await this.rooms.find(roomId)
    const player = await this.players.find(socket.id)

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
    this.rooms.update(room)

    player.removeKey()
    player.addTreasure()
    player.movesCount = 0

    this.players.update(player)
    this.broadcaster.broadcast(room)

    this.server.emitInRoom('chests', room, new ChestsEvent(room.getChests()))
  }
}
