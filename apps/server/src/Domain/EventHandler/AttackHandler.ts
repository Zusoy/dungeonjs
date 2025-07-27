import { inject, injectable, registry } from 'tsyringe'
import type { AttackEvent } from 'Domain/Event/AttackEvent'
import type { IEventHandler } from 'Domain/EventHandler/IEventHandler'
import type { IServer } from 'Domain/IServer'
import type { ISocket } from 'Domain/ISocket'
import type { IPlayers } from 'Domain/Repository/IPlayers'
import type { IRooms } from 'Domain/Repository/IRooms'
import type { IPlayerBroadcaster } from 'Domain/Notification/IPlayerBroadcaster'
import type { IRandomizer } from 'Domain/RNG/IRandomizer'
import { ObjectNotFoundError } from 'Domain/Error/ObjectNotFoundError'
import type { Factory as LootFactory } from 'Domain/Loot/Factory'
import { PlayerNotInRoomError } from 'Domain/Error/PlayerNotInRoomError'

@injectable()
@registry([{ token: 'handlers', useClass: AttackHandler }])
export class AttackHandler implements IEventHandler<'attack'> {
  constructor(
    @inject('server')
    private readonly server: IServer,
    @inject('players')
    private readonly players: IPlayers,
    @inject('rooms')
    private readonly rooms: IRooms,
    @inject('players.broadcaster')
    private readonly broadcaster: IPlayerBroadcaster,
    @inject('factory.loots')
    private readonly loots: LootFactory,
    @inject('rng')
    private readonly rng: IRandomizer
  ) {
  }

  supports(channel: 'attack', _socket: ISocket, _event: AttackEvent): boolean {
    return channel === 'attack'
  }

  handle(_channel: 'attack', socket: ISocket, event: AttackEvent): void {
    const player = this.players.find(socket.id)
    const roomId = socket.room

    if (!player) {
      throw new ObjectNotFoundError("Player", socket.id)
    }

    if (!roomId) {
      throw new PlayerNotInRoomError(socket.id)
    }

    const room = this.rooms.find(roomId)

    if (!room) {
      throw new ObjectNotFoundError("Room", roomId)
    }

    const enemy = room.findEnemy(event.enemyId)

    if (!enemy) {
      throw new ObjectNotFoundError("Enemy", event.enemyId)
    }

    const inventoryBonus = player.inventory.weapons.reduce((acc, curr) => acc + curr.attack, 0)
    const firstDiceResult = this.rng.diceRoll()
    const secondDiceResult = this.rng.diceRoll()
    const attack = firstDiceResult + secondDiceResult + inventoryBonus
    const succeed = attack > enemy.defense

    this.server.emitInRoom('combatResolved', room, { succeed , firstDiceResult, secondDiceResult, inventoryBonus })

    if (!succeed) {
      player.health = Math.max(0, player.health - 1)
      player.coords = event.originCoords
      player.position = [
        event.originCoords[0] * 8,
        player.position[1],
        event.originCoords[1] * 8
      ]

      this.players.update(player)
      this.broadcaster.broadcast(room)
      return
    }

    const lootable = this.loots.buildLootable(enemy.loot, enemy.coords)
    room.removeEnemy(enemy.id)
    room.addLoot(lootable)
    this.rooms.update(room)

    this.server.emitInRoom('enemies', room, { skeletons: room.getEnemies() })
    this.server.emitInRoom('loots', room, { loots: room.getLoots() })
  }
}
