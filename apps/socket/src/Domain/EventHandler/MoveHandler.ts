import { inject, injectable, registry } from 'tsyringe'
import type { MoveEvent } from 'Domain/Event/MoveEvent'
import type { ISocket } from 'Domain/ISocket'
import type { IEventHandler } from 'Domain/EventHandler/IEventHandler'
import type { IPlayers } from 'Domain/Repository/IPlayers'
import type { IRooms } from 'Domain/Repository/IRooms'
import type { IServer } from 'Domain/IServer'
import type { ILogger } from 'Domain/ILogger'
import type { IPlayerBroadcaster } from 'Domain/Notification/IPlayerBroadcaster'
import type { ITurnAllocator } from 'Domain/Notification/ITurnAllocator'
import type { Factory as TileFactory } from 'Domain/Tile/Factory'
import type { Factory as SkeletonFactory } from 'Domain/Skeleton/Factory'
import type { Factory as LootFactory } from 'Domain/Loot/Factory'
import { WeaponRandomizer } from 'Domain/Loot/WeaponRandomizer'
import type { Chest } from 'Domain/Model/Chest'
import type { IRandomizer } from 'Domain/RNG/IRandomizer'
import { TileType } from 'Domain/Model/Tile'
import { SkeletonType } from 'Domain/Model/Skeleton'
import { OperationDeniedError } from 'Domain/Error/OperationDeniedError'
import { ObjectNotFoundError } from 'Domain/Error/ObjectNotFoundError'
import { LootObject, LootType } from 'Domain/Model/Loot'

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
    @inject('turn_allocator')
    private readonly turnAllocator: ITurnAllocator,
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
  ) { }

  supports(channel: 'moveToCoords', _socket: ISocket, _event: MoveEvent): boolean {
    return channel === 'moveToCoords'
  }

  handle(_channel: 'moveToCoords', socket: ISocket, event: MoveEvent): void {
    const roomId = socket.room

    if (!roomId) {
      throw new OperationDeniedError()
    }

    const player = this.players.find(socket.id)

    if (!player) {
      throw new ObjectNotFoundError("Player", socket.id)
    }

    const playerIndex = Array.from(this.players).findIndex(player => player.id === socket.id)
    const roomIndex = Array.from(this.rooms).findIndex(room => room.roomId === roomId)

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

      this.server.emitInRoom('discoverTile', room, { tile })
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
          const skeletonType = this.rng.enumValue(SkeletonType)
          const skeleton = this.skeletons.build(skeletonType, Date.now().toString(), event.coords, loot)

          room.addEnemy(skeleton)
          this.rooms.update(room, roomIndex)
          this.logger.info('Discovered Skeleton !', skeleton)

          this.server.emitInRoom('enemies', room, { skeletons: room.getEnemies() })
          this.server.emitInRoom('startFight', room, { enemyId: skeleton.id, playerId: socket.id, originCoords })
        }
        else {
          const chest: Chest = { id: Date.now().toString(), coords: event.coords }
          room.addChest(chest)
          this.rooms.update(room, roomIndex)

          this.server.emitInRoom('chests', room, { chests: room.getChests() })
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

    this.players.update(player, playerIndex)
    this.broadcaster.broadcast(room)

    const enemyAtCoords = room.findEnemyAtCoords(event.coords)

    if (enemyAtCoords) {
      this.server.emit('startFight', { playerId: socket.id, enemyId: enemyAtCoords.id, originCoords })
      return
    }

    if (player.movesCount === 0) {
      this.turnAllocator.allocateNextTurn(room, player.id)
    }
  }
}
