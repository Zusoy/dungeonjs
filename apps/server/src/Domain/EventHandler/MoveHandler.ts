import { inject, injectable, registry } from 'tsyringe'
import type { MoveEvent } from 'Domain/Event/MoveEvent'
import type { ISocket } from 'Domain/ISocket'
import type { IEventHandler } from 'Domain/EventHandler/IEventHandler'
import type { IPlayers } from 'Domain/Repository/IPlayers'
import type { IRooms } from 'Domain/Repository/IRooms'
import type { IServer } from 'Domain/IServer'
import type { ILogger } from 'Domain/ILogger'
import type { IPlayerBroadcaster } from 'Domain/Notification/IPlayerBroadcaster'
import type { Factory as TileFactory } from 'Domain/Tile/Factory'
import type { Factory as SkeletonFactory } from 'Domain/Skeleton/Factory'
import type { Factory as LootFactory } from 'Domain/Loot/Factory'
import type { Chest } from 'Domain/Model/Chest'
import type { IRandomizer } from 'Domain/RNG/IRandomizer'
import { WeaponRandomizer } from 'Domain/Loot/WeaponRandomizer'
import { TileType } from 'Domain/Model/Tile'
import { SkeletonType } from 'Domain/Model/Skeleton'
import { OperationDeniedError } from 'Domain/Error/OperationDeniedError'
import { ObjectNotFoundError } from 'Domain/Error/ObjectNotFoundError'
import { LootObject, LootType } from 'Domain/Model/Loot'
import { DiscoverTileEvent } from 'Domain/Event/DiscoverTileEvent'
import { SkeletonsEvent } from 'Domain/Event/SkeletonsEvent'
import { EngageCombatEvent } from 'Domain/Event/EngageCombatEvent'
import { ChestsEvent } from 'Domain/Event/ChestsEvent'

@injectable()
@registry([{ token: 'handlers', useClass: MoveHandler }])
export class MoveHandler implements IEventHandler<'moveToCoords'> {
  constructor(
    @inject('players')
    private readonly players: IPlayers,
    @inject('rooms')
    private readonly rooms: IRooms,
    @inject('server')
    private readonly server: IServer,
    @inject('logger')
    private readonly logger: ILogger,
    @inject('players.broadcaster')
    private readonly broadcaster: IPlayerBroadcaster,
    @inject('factory.loots')
    private readonly loots: LootFactory,
    @inject('factory.skeletons')
    private readonly skeletons: SkeletonFactory,
    @inject('factory.tiles')
    private readonly tiles: TileFactory,
    @inject('rng')
    private readonly rng: IRandomizer,
    @inject('weapon.randomizer')
    private readonly weaponRandomizer: WeaponRandomizer,
    @inject('chance.room')
    private readonly roomDiscoveryChance: number,
    @inject('chance.enemy')
    private readonly enemyDiscoveryChance: number,
    @inject('chance.loot.key')
    private readonly keyLootChance: number,
    @inject('chance.golem')
    private readonly golemDiscoveryChance: number
  ) { }

  supports(channel: 'moveToCoords', _socket: ISocket, _event: MoveEvent): boolean {
    return channel === 'moveToCoords'
  }

  async handle(_channel: 'moveToCoords', socket: ISocket, event: MoveEvent): Promise<void> {
    const roomId = socket.room

    if (!roomId) {
      throw new OperationDeniedError()
    }

    const player = this.players.find(socket.id)

    if (!player) {
      throw new ObjectNotFoundError("Player", socket.id)
    }

    const room = this.rooms.find(roomId)
    const originCoords = player.coords

    if (!room) {
      throw new ObjectNotFoundError("Room", roomId)
    }

    if (event.uncharted) {
      const roomDiscovery = this.rng.boolean(this.roomDiscoveryChance)
      const randomTileType = roomDiscovery ? TileType.Room : TileType.Corridor

      const type = event.neighborTiles.length > 1
        ? TileType.Room
        : randomTileType

      const tile = this.tiles.build(
        type,
        {
          id: Date.now().toString(),
          coords: event.coords,
          direction: event.fromDirection,
          adjacentTiles: event.neighborTiles
        }
      )

      this.server.emitInRoom('discoverTile', room, new DiscoverTileEvent(tile))
      this.logger.info('Discover tile', tile)

      if (tile.type === TileType.Room) {
        const hasEnemy = this.rng.boolean(this.enemyDiscoveryChance)

        if (hasEnemy) {
          const lootKey = this.rng.boolean(this.keyLootChance)
          const lootId: string = Date.now().toString()

          const lootType = lootKey ? LootType.Key : LootType.Weapon
          const lootItem: LootObject = lootKey
            ? { id: lootId }
            : this.weaponRandomizer.randomWeapon(lootId)

          const loot = this.loots.build(lootType, lootItem)
          const isGolem = this.rng.boolean(this.golemDiscoveryChance) && !room.hasGolem()
          const skeletonType = isGolem ? SkeletonType.Golem : this.rng.enumValue(SkeletonType, [SkeletonType.Golem])
          const skeleton = this.skeletons.build(skeletonType, Date.now().toString(), event.coords, loot)

          room.addEnemy(skeleton)
          this.rooms.update(room)
          this.logger.info('Discovered Skeleton !', skeleton)

          this.server.emitInRoom('enemies', room, new SkeletonsEvent(room.getEnemies()))

          const engageEvent = new EngageCombatEvent(socket.id, skeleton.id, originCoords)
          this.server.emitInRoom('engageCombat', room, engageEvent)
        }
        else {
          const chest: Chest = { id: Date.now().toString(), coords: event.coords }
          room.addChest(chest)
          this.rooms.update(room)

          this.server.emitInRoom('chests', room, new ChestsEvent(room.getChests()))
        }
      }
    }

    player.position = [
      event.coords[0] * 8,
      player.position[1],
      event.coords[1] * 8
    ]

    player.coords = event.coords
    player.movesCount = Math.max(0, player.movesCount - 1)

    this.players.update(player)
    this.broadcaster.broadcast(room)

    const enemyAtCoords = room.findEnemyAtCoords(event.coords)

    if (enemyAtCoords) {
      const engageEvent = new EngageCombatEvent(socket.id, enemyAtCoords.id, originCoords)
      this.server.emit('engageCombat', engageEvent)
      return
    }
  }
}
