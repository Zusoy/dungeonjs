import { inject, injectable, registry } from 'tsyringe'
import type { AttackEvent } from 'Domain/Event/AttackEvent'
import type { IEventHandler } from 'Domain/EventHandler/IEventHandler'
import type { IServer } from 'Domain/IServer'
import type { ISocket } from 'Domain/ISocket'
import type { IPlayers } from 'Domain/Repository/IPlayers'
import type { IRooms } from 'Domain/Repository/IRooms'
import type { ITurnAllocator } from 'Domain/Notification/ITurnAllocator'
import type { IPlayerBroadcaster } from 'Domain/Notification/IPlayerBroadcaster'
import { Random } from 'Domain/RNG/Random'
import { ObjectNotFoundError } from 'Domain/Error/ObjectNotFoundError'
import { OperationDeniedError } from 'Domain/Error/OperationDeniedError'

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
    @inject('turn_allocator')
    private readonly turnAllocator: ITurnAllocator,
    @inject('players.broadcaster')
    private readonly broadcaster: IPlayerBroadcaster
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
      throw new OperationDeniedError()
    }

    const room = this.rooms.find(roomId)

    if (!room) {
      throw new ObjectNotFoundError("Room", roomId)
    }

    const roomIndex = Array.from(this.rooms).findIndex(r => r.roomId === room.roomId)
    const enemy = room.findEnemy(event.enemyId)

    if (!enemy) {
      throw new ObjectNotFoundError("Enemy", event.enemyId)
    }

    const attackBonus = player.inventory.weapons.reduce((acc, curr) => acc + curr.attack, 0)
    const firstDiceRoll = Random.diceRoll()
    const secondDiceRoll = Random.diceRoll()
    const attack = firstDiceRoll + secondDiceRoll + attackBonus
    const succeed = attack > enemy.defense

    this.server.emitInRoom('attacked', room, { succeed , attack })

    if (!succeed) {
      const playerIndex = Array.from(this.players).findIndex(player => player.id === socket.id)
      player.health = Math.max(0, player.health - 1)
      player.coords = event.originCoords
      player.position = [
        event.originCoords[0] * 8,
        player.position[1],
        event.originCoords[1] * 8
      ]

      this.players.update(player, playerIndex)
      this.broadcaster.broadcast(room)
      this.turnAllocator.allocateNextTurn(room, player.id)
      return
    }

    room.removeEnemy(event.enemyId)
    this.rooms.update(room, roomIndex)
    this.server.emitInRoom('enemies', room, { skeletons: room.getEnemies() })
    this.turnAllocator.allocateNextTurn(room, player.id)
  }
}
