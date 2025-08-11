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
import { Factory as LootFactory } from 'Domain/Loot/Factory'
import { Players } from 'Application/Repository/Players'
import { Rooms } from 'Application/Repository/Rooms'
import { IRandomizer } from 'Domain/RNG/IRandomizer'
import { Randomizer } from 'Application/RNG/Randomizer'
import { WeaponLootBuilder } from 'Domain/Loot/Builder/WeaponLootBuilder'
import { KeyLootBuilder } from 'Domain/Loot/Builder/KeyLootBuilder'
import { WeaponRandomizer } from 'Domain/Loot/WeaponRandomizer'

// parameters
container.register('room.maxplayer', { useValue: 4 })
container.register('chance.golem', { useValue: 2 })
container.register('chance.enemy', { useValue: 80 })
container.register('chance.room', { useValue: 36 })
container.register('chance.loot.key', { useValue: 30 })
container.register('chance.loot.axe', { useValue: 10 })
container.register('chance.loot.sword', { useValue: 30 })
container.register('player.inventory.maxkeys', { useValue: 1 })
container.register('player.inventory.maxweapons', { useValue: 2 })
container.register('player.golem.reward', { useValue: 2 })

// RNG
container.register<IRandomizer>(
  'rng',
  { useClass: Randomizer },
  { lifecycle: Lifecycle.Singleton }
)

container.register<WeaponRandomizer>(
  'weapon.randomizer',
  { useClass: WeaponRandomizer },
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

// tiles factory
container.register<CorridorBuilder>(CorridorBuilder, { useClass: CorridorBuilder })
container.register<RoomBuilder>(RoomBuilder, { useClass: RoomBuilder })
container.register<TileFactory>(
  'factory.tiles',
  { useClass: TileFactory }
)

// skeletons factory
container.register<SkeletonFactory>(
  'factory.skeletons',
  { useClass: SkeletonFactory },
  { lifecycle: Lifecycle.Singleton }
)

// loots factory
container.register<WeaponLootBuilder>(WeaponLootBuilder, { useClass: WeaponLootBuilder })
container.register<KeyLootBuilder>(KeyLootBuilder, { useClass: KeyLootBuilder })
container.register<LootFactory>(
  'factory.loots',
  { useClass: LootFactory },
  { lifecycle: Lifecycle.Singleton }
)

export default container
