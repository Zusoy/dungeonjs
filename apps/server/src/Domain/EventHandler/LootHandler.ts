import { inject, injectable, registry } from 'tsyringe'
import type { ISocket } from 'Domain/ISocket'
import type { LootEvent } from 'Domain/Event/LootEvent'
import type { IEventHandler } from 'Domain/EventHandler/IEventHandler'
import type { IRooms } from 'Domain/Repository/IRooms'
import type { IPlayers } from 'Domain/Repository/IPlayers'
import type { IPlayerBroadcaster } from 'Domain/Notification/IPlayerBroadcaster'
import type { IServer } from 'Domain/IServer'
import { OperationDeniedError } from 'Domain/Error/OperationDeniedError'
import { ObjectNotFoundError } from 'Domain/Error/ObjectNotFoundError'
import { LootType } from 'Domain/Model/Loot'
import { Coords } from 'Domain/Geometry/Coords'
import { PlayerNotInRoomError } from 'Domain/Error/PlayerNotInRoomError'
import { LootsEvent } from 'Domain/Event/LootsEvent'
import { BROADCASTER, HANDLERS, INVENTORY_MAX_KEY_PARAMETER, INVENTORY_MAX_WEAPON_PARAMETER, PLAYERS, ROOMS, SERVER } from 'Domain/tokens'

@injectable()
@registry([{ token: HANDLERS, useClass: LootHandler }])
export class LootHandler implements IEventHandler<'loot'> {
  constructor(
    @inject(ROOMS)
    private readonly rooms: IRooms,
    @inject(PLAYERS)
    private readonly players: IPlayers,
    @inject(BROADCASTER)
    private readonly broadcaster: IPlayerBroadcaster,
    @inject(SERVER)
    private readonly server: IServer,
    @inject(INVENTORY_MAX_KEY_PARAMETER)
    private readonly maxPlayerInventoryKeyCount: number,
    @inject(INVENTORY_MAX_WEAPON_PARAMETER)
    private readonly maxPlayerInventoryWeaponCount: number
  ) {}

  supports(channel: 'loot', _socket: ISocket, _event: LootEvent): boolean {
    return channel === 'loot'
  }

  async handle(_channel: 'loot', socket: ISocket, event: LootEvent): Promise<void> {
    if (!socket.room) {
      throw new PlayerNotInRoomError(socket.id)
    }

    const room = this.rooms.find(socket.room)
    const player = this.players.find(socket.id)

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

    player.movesCount = 0
    this.players.update(player)

    room.removeLoot(loot.id)
    this.rooms.update(room)

    this.broadcaster.broadcast(room)
    this.server.emitInRoom('loots', room, new LootsEvent(room.getLoots()))
  }
}
