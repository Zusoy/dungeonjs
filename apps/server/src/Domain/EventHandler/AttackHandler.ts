import { inject, injectable, registry } from 'tsyringe'
import type { AttackEvent } from 'Domain/Event/AttackEvent'
import type { IEventHandler } from 'Domain/EventHandler/IEventHandler'
import type { IServer } from 'Domain/IServer'
import type { ISocket } from 'Domain/ISocket'
import type { IPlayers } from 'Domain/Repository/IPlayers'
import type { IRooms } from 'Domain/Repository/IRooms'
import type { IPlayerBroadcaster } from 'Domain/Notification/IPlayerBroadcaster'
import type { IRandomizer } from 'Domain/RNG/IRandomizer'
import type { Factory as LootFactory } from 'Domain/Loot/Factory'
import { ObjectNotFoundError } from 'Domain/Error/ObjectNotFoundError'
import { PlayerNotInRoomError } from 'Domain/Error/PlayerNotInRoomError'
import { SkeletonType } from 'Domain/Model/Skeleton'
import { GameEndedEvent } from 'Domain/Event/GameEndedEvent'
import { CombatResolvedEvent } from 'Domain/Event/CombatResolvedEvent'
import { SkeletonsEvent } from 'Domain/Event/SkeletonsEvent'
import { LootsEvent } from 'Domain/Event/LootsEvent'

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
    private readonly rng: IRandomizer,
    @inject('player.golem.reward')
    private readonly golemReward: number
  ) {
  }

  supports(channel: 'attack', _socket: ISocket, _event: AttackEvent): boolean {
    return channel === 'attack'
  }

  async handle(_channel: 'attack', socket: ISocket, event: AttackEvent): Promise<void> {
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

    const resolvedEvent = new CombatResolvedEvent(succeed, firstDiceResult, secondDiceResult, inventoryBonus)
    this.server.emitInRoom('combatResolved', room, resolvedEvent)

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

    if (enemy.type === SkeletonType.Golem) {
      player.addTreasures(this.golemReward)
      this.players.update(player)

      const playerIds = await this.server.fetchSocketIds(room)
      const players = Array.from(playerIds)
        .map(id => this.players.find(id))
        .filter(player => !!player)

      const winnerPlayer = [...players].sort((pA, pB) => pB.inventory.treasures - pA.inventory.treasures)[0]
      const endGameEvent = new GameEndedEvent(
        Date.now(),
        player.id,
        winnerPlayer.id
      )

      await this.broadcaster.broadcast(room)
      this.server.emitInRoom('gameEnded', room, endGameEvent)
    }

    const lootable = this.loots.buildLootable(enemy.loot, enemy.coords)
    room.removeEnemy(enemy.id)
    room.addLoot(lootable)
    this.rooms.update(room)

    const enemiesEvent = new SkeletonsEvent(room.getEnemies())
    const lootsEvent = new LootsEvent(room.getLoots())

    this.server.emitInRoom('enemies', room, enemiesEvent)
    this.server.emitInRoom('loots', room, lootsEvent)
  }
}
