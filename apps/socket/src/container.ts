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

export default container
