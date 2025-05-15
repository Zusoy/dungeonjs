import 'reflect-metadata'
import type { ILogger } from 'Domain/ILogger'
import type { IPlayers } from 'Domain/Repository/IPlayers'
import type { IRooms } from 'Domain/Repository/IRooms'
import { container, Lifecycle } from 'tsyringe'
import { ConsoleLogger } from 'Application/Logger/ConsoleLogger'
import { CorridorBuilder } from 'Domain/Tile/Builder/CorridorBuilder'
import { RoomBuilder } from 'Domain/Tile/Builder/RoomBuilder'
import { Factory as TileFactory } from 'Domain/Tile/Factory'
import { Factory as SkeletonFactory } from 'Domain/Skeleton/Factory'
import { Players } from 'Application/Repository/Players'
import { Rooms } from 'Application/Repository/Rooms'
import { IRandomizer } from 'Domain/RNG/IRandomizer'
import { Randomizer } from 'Application/RNG/Randomizer'

// parameters
container.register('chance.enemy', { useValue: 80 })
container.register('chance.room', { useValue: 36 })

// RNG
container.register<IRandomizer>(
  'rng',
  { useClass: Randomizer },
  { lifecycle: Lifecycle.Singleton }
)

// repositories
container.register<IPlayers>(
  'players',
  { useClass: Players },
  { lifecycle: Lifecycle.Singleton }
)
container.register<IRooms>(
  'rooms',
  { useClass: Rooms },
  { lifecycle: Lifecycle.Singleton }
)

// logger
container.register<ILogger>(
  'logger',
  { useClass: ConsoleLogger },
  { lifecycle: Lifecycle.Singleton }
)

// factories
container.register<CorridorBuilder>(CorridorBuilder, { useClass: CorridorBuilder })
container.register<RoomBuilder>(RoomBuilder, { useClass: RoomBuilder })
container.register<TileFactory>(
  'factory.tiles',
  { useClass: TileFactory }
)
container.register<SkeletonFactory>(
  'factory.skeletons',
  { useClass: SkeletonFactory },
  { lifecycle: Lifecycle.Singleton }
)

export default container
