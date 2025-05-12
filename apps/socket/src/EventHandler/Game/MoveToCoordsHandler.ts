import { inject, injectable, registry } from 'tsyringe'
import type IEventHandler from 'IEventHandler'
import type ICollection from 'Netcode/Collection/ICollection'
import type ILogger from 'ILogger'
import type ISocket from 'ISocket'
import type IServer from 'IServer'
import type { MoveToCoordsPayload } from 'types/payload'
import { Skeleton, SkeletonType } from 'types/enemy'
import { TileType } from 'types/tile'
import User from 'Netcode/User'
import Room from 'Netcode/Room'
import UserEmitter from 'Netcode/UserEmitter'
import TileFactory from 'Factory/TileFactory'
import Random from 'Random'
import EnemyFactory from 'Factory/EnemyFactory'

@injectable()
@registry([{ token: 'handlers', useClass: MoveToCoordsHandler }])
export default class MoveToCoordsHandler implements IEventHandler<'moveToCoords'> {
  constructor(
    @inject('users') private readonly users: ICollection<User>,
    @inject('rooms') private readonly rooms: ICollection<Room>,
    @inject('server') private readonly server: IServer,
    @inject('logger') private readonly logger: ILogger,
    @inject('emitter.user') private readonly userEmitter: UserEmitter,
    @inject('tile.factory') private readonly tileFactory: TileFactory,
    @inject('enemy.factory') private readonly enemyFactory: EnemyFactory,
    @inject('chance.room') private readonly roomDiscoveryChance: number,
    @inject('chance.enemy') private readonly enemyDiscoveryChance: number
  ) {
  }

  supports(event: 'moveToCoords', _payload: [payload: MoveToCoordsPayload], _socket: ISocket): boolean {
    return event === 'moveToCoords'
  }

  handle(_event: 'moveToCoords', payload: [payload: MoveToCoordsPayload], socket: ISocket): void {
    const [movePayload] = payload
    const roomId = socket.rooms.find(room => !!this.rooms.find(room))
    const user = this.users.find(socket.id)
    const userIndex = Array.from(this.users).findIndex(user => user.id === socket.id)

    if (!roomId || !user || userIndex < 0) {
      return
    }

    const room = this.rooms.find(roomId)

    if (!room) {
      this.logger.error(`Room not found with ID ${roomId}`)
      return
    }

    if (movePayload.uncharted) {
      const roomDiscovery = Random.boolean(this.roomDiscoveryChance)
      const randomTileType = roomDiscovery ? TileType.Room : TileType.Corridor

      const type = movePayload.neighborTiles.length > 1
        ? TileType.Room
        : randomTileType

      const tile = this.tileFactory.build(
        type,
        {
          id: Date.now().toString(),
          coords: movePayload.coords,
          direction: movePayload.fromDirection,
          adjacentTiles: movePayload.neighborTiles
        }
      )

      this.server.emitInRoom('discoverTile', room, tile)
      this.logger.info('Discover tile', tile)

      if (tile.type === TileType.Room) {
        const hasEnemy = Random.boolean(this.enemyDiscoveryChance)

        if (hasEnemy) {
          const skeletonType = Random.enumValue(SkeletonType)
          const enemy = this.enemyFactory.build(skeletonType, Date.now().toString(), movePayload.coords)

          this.server.emitInRoom('discoverEnemy', room, enemy)
          this.server.emitInRoom('startFight', room, { enemyId: enemy.id, playerId: socket.id, originCoords: user.coords })
        } else {
          this.server.emitInRoom('discoverChest', room, { id: Date.now().toString(), coords: movePayload.coords })
        }
      }
    }

    user.position = [
      movePayload.coords[0] * 8,
      user.position[1],
      movePayload.coords[1] * 8
    ]

    user.coords = movePayload.coords
    user.movesCount = Math.max(0, user.movesCount - 1)

    this.users.update(user, userIndex)
    this.userEmitter.broadcast(room)

    if (user.movesCount === 0) {
      this.userEmitter.broadcastNextTurn(room, socket.id)
    }
  }
}
