import { inject, injectable, registry } from 'tsyringe'
import type IEventHandler from 'IEventHandler'
import type ISocket from 'ISocket'
import type IServer from 'IServer'
import type ICollection from 'Netcode/Collection/ICollection'
import type ILogger from 'ILogger'
import type User from 'Netcode/User'
import type { AttackPayload } from 'types/payload'
import type Room from 'Netcode/Room'
import type UserEmitter from 'Netcode/UserEmitter'
import Random from 'Random'

@injectable()
@registry([{ token: 'handlers', useClass: AttackHandler }])
export default class AttackHandler implements IEventHandler<'attack'> {
  constructor(
    @inject('server') private readonly server: IServer,
    @inject('users') private readonly users: ICollection<User>,
    @inject('rooms') private readonly rooms: ICollection<Room>,
    @inject('emitter.user') private readonly userEmitter: UserEmitter,
    @inject('logger') private readonly logger: ILogger
  ) {
  }

  supports(event: 'attack', _payload: [payload: AttackPayload], _socket: ISocket): boolean {
    return event === 'attack'
  }

  handle(_event: 'attack', payload: [payload: AttackPayload], socket: ISocket): void {
    const user = this.users.find(socket.id)
    const [attackPayload] = payload

    if (!user) {
      this.logger.error(`User not found with id ${socket.id}`)
      return
    }

    const roomId = socket.rooms.find(room => !!this.rooms.find(room))
    const roomIndex = Array.from(this.rooms).findIndex(room => room.roomId === roomId)
    const room = roomId
      ? this.rooms.find(roomId)
      : null

    if (!room) {
      this.logger.error(`Room not found with ID ${roomId}`)
      return
    }

    const enemy = room.findEnemy(attackPayload.enemyId)

    if (!enemy) {
      this.logger.error(`Enemy target not found in Room ${room.roomId} with ID ${attackPayload.enemyId}`)
      return
    }

    const attackBonus = user.inventory.weapons.reduce((acc, curr) => acc + curr.attack, 0)
    const attack = Random.diceRoll() + attackBonus
    const succeed = attack > enemy.defense

    this.server.emitInRoom('attacked', room, { succeed , attack })

    if (!succeed) {
      const userIndex = Array.from(this.users).findIndex(user => user.id === socket.id)
      user.health = Math.max(0, user.health - 1)
      user.coords = attackPayload.originCoords
      user.position = [
        attackPayload.originCoords[0] * 8,
        user.position[1],
        attackPayload.originCoords[1] * 8
      ]

      this.users.update(user, userIndex)
      this.userEmitter.broadcast(room)
      this.userEmitter.broadcastNextTurn(room, user.id)
      return
    }

    room.removeEnemy(attackPayload.enemyId)
    this.rooms.update(room, roomIndex)
    this.server.emitInRoom('enemies', room, room.getEnemies())
    this.userEmitter.broadcastNextTurn(room, user.id)
  }
}
