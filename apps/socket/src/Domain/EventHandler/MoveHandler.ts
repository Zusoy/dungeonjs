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
import type { Chest } from 'Domain/Model/Chest'
import { Random } from 'Domain/RNG/Random'
import { TileType } from 'Domain/Model/Tile'
import { SkeletonType } from 'Domain/Model/Skeleton'

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
    @inject('factory.skeletons')
    private readonly skeletons: SkeletonFactory,
    @inject('factory.tiles')
    private readonly tiles: TileFactory,
    @inject('chance.room')
    private readonly roomDiscoveryChance: number,
    @inject('chance.enemy')
    private readonly enemyDiscoveryChance: number
  ) { }

  supports(channel: 'moveToCoords', _socket: ISocket, _event: MoveEvent): boolean {
    return channel === 'moveToCoords'
  }

  handle(_channel: 'moveToCoords', socket: ISocket, event: MoveEvent): void {
    const roomId = socket.rooms.find(room => !!this.rooms.find(room))
    const player = this.players.find(socket.id)
    const playerIndex = Array.from(this.players).findIndex(player => player.id === socket.id)
    const roomIndex = Array.from(this.rooms).findIndex(room => room.roomId === roomId)

    if (!roomId || !player || playerIndex < 0) {
      return
    }

    const room = this.rooms.find(roomId)
    const originCoords = player.coords

    if (!room) {
      throw new Error(`Room not found with ID ${roomId}`)
    }

    if (event.uncharted) {
      const roomDiscovery = Random.boolean(this.roomDiscoveryChance)
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
        const hasEnemy = Random.boolean(this.enemyDiscoveryChance)

        if (hasEnemy) {
          const skeletonType = Random.enumValue(SkeletonType)
          const enemy = this.skeletons.build(skeletonType, Date.now().toString(), event.coords)
          room.addEnemy(enemy)
          this.rooms.update(room, roomIndex)

          this.server.emitInRoom('enemies', room, { skeletons: room.getEnemies() })
          this.server.emitInRoom('startFight', room, { enemyId: enemy.id, playerId: socket.id, originCoords })
        }
        else {
          const chest: Chest = { id: Date.now().toString(), coords: event.coords }
          this.server.emitInRoom('discoverChest', room, { chest })
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
