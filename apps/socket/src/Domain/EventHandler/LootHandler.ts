import { inject, injectable, registry } from 'tsyringe'
import { OperationDeniedError } from 'Domain/Error/OperationDeniedError'
import { ObjectNotFoundError } from 'Domain/Error/ObjectNotFoundError'
import { LootType } from 'Domain/Model/Loot'
import type { ISocket } from 'Domain/ISocket'
import type { LootEvent } from 'Domain/Event/LootEvent'
import type { IEventHandler } from 'Domain/EventHandler/IEventHandler'
import type { IRooms } from 'Domain/Repository/IRooms'
import type { IPlayers } from 'Domain/Repository/IPlayers'
import type { IPlayerBroadcaster } from 'Domain/Notification/IPlayerBroadcaster'
import type { IServer } from 'Domain/IServer'
import type { ITurnAllocator } from 'Domain/Notification/ITurnAllocator'
import { Coords } from 'Domain/Geometry/Coords'
import { PlayerNotInRoomError } from 'Domain/Error/PlayerNotInRoomError'

@injectable()
@registry([{ token: 'handlers', useClass: LootHandler }])
export class LootHandler implements IEventHandler<'loot'> {
  constructor(
    @inject('rooms')
    private readonly rooms: IRooms,
    @inject('players')
    private readonly players: IPlayers,
    @inject('players.broadcaster')
    private readonly broadcaster: IPlayerBroadcaster,
    @inject('turn_allocator')
    private readonly turnAllocator: ITurnAllocator,
    @inject('server')
    private readonly server: IServer,
    @inject('player.inventory.maxkeys')
    private readonly maxPlayerInventoryKeyCount: number,
    @inject('player.inventory.maxweapons')
    private readonly maxPlayerInventoryWeaponCount: number
  ) {}

  supports(channel: 'loot', _socket: ISocket, _event: LootEvent): boolean {
    return channel === 'loot'
  }

  handle(_channel: 'loot', socket: ISocket, event: LootEvent): void {
    if (!socket.room) {
      throw new PlayerNotInRoomError(socket.id)
    }

    const room = this.rooms.find(socket.room)
    const roomIndex = Array.from(this.rooms).findIndex(r => r.roomId === socket.room)
    const player = this.players.find(socket.id)
    const playerIndex = Array.from(this.players).findIndex(p => p.id === socket.id)

    if (!room) {
      throw new ObjectNotFoundError('Room', socket.room)
    }

    if (!player) {
      throw new ObjectNotFoundError('Player', socket.id)
    }

    const loot = room.findLoot(event.lootId)

    if (!loot) {
      throw new ObjectNotFoundError('Loot', event.lootId)
    }

    const playerCoords = Coords.fromScalar(player.coords)
    const lootCoords = Coords.fromScalar(loot.coords)

    if (!playerCoords.equals(lootCoords)) {
      throw new OperationDeniedError()
    }

    switch (loot.itemType) {
      case LootType.Key: {
        if (player.inventory.keys >= this.maxPlayerInventoryKeyCount) {
          throw new OperationDeniedError()
        }
        player.addKey()
        break
      }

      case LootType.Weapon: {
        if (player.inventory.weapons.length >= this.maxPlayerInventoryWeaponCount) {
          throw new OperationDeniedError()
        }

        player.addWeapon(loot.item)
        break
      }
    }

    this.players.update(player, playerIndex)
    room.removeLoot(loot.id)
    this.rooms.update(room, roomIndex)

    this.broadcaster.broadcast(room)
    this.server.emitInRoom('loots', room, { loots: room.getLoots() })
    this.turnAllocator.allocateNextTurn(room, player.id)
  }
}
