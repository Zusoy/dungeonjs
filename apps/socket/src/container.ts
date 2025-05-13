import 'reflect-metadata'
import { container, Lifecycle } from 'tsyringe'
import type ICollection from 'Netcode/Collection/ICollection'
import type ILogger from 'ILogger'
import type User from 'Netcode/User'
import type Room from 'Netcode/Room'
import UserCollection from 'Netcode/Collection/UserCollection'
import RoomCollection from 'Netcode/Collection/RoomCollection'
import ConsoleLogger from 'Logger/ConsoleLogger'
import UserEmitter from 'Netcode/UserEmitter'
import CorridorBuilder from 'Factory/Tile/CorridorBuilder'
import RoomBuilder from 'Factory/Tile/RoomBuilder'
import TileFactory from 'Factory/TileFactory'
import EnemyFactory from 'Factory/EnemyFactory'

// parameters
container.register('chance.enemy', { useValue: 80 })
container.register('chance.room', { useValue: 36 })

// collections
container.register<ICollection<User>>(
  'users',
  { useClass: UserCollection },
  { lifecycle: Lifecycle.Singleton }
)

container.register<ICollection<Room>>(
  'rooms',
  { useClass: RoomCollection },
  { lifecycle: Lifecycle.Singleton }
)

// logger
container.register<ILogger>(
  'logger',
  { useClass: ConsoleLogger }
)

// emitters
container.register<UserEmitter>(
  'emitter.user',
  { useClass: UserEmitter }
)

// factories
container.register<CorridorBuilder>(CorridorBuilder, { useClass: CorridorBuilder })
container.register<RoomBuilder>(RoomBuilder, { useClass: RoomBuilder })
container.register<TileFactory>(
  'tile.factory',
  { useClass: TileFactory }
)
container.register<EnemyFactory>(
  'enemy.factory',
  { useClass: EnemyFactory },
  { lifecycle: Lifecycle.Singleton }
)

export default container
