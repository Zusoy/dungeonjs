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
import * as Tokens from 'Domain/tokens'

// parameters
container.register(Tokens.MAX_PLAYER_PARAMETER, { useValue: 4 })
container.register(Tokens.GOLEM_DISCOVERY_CHANCE_PARAMETER, { useValue: 2 })
container.register(Tokens.ENEMY_DISCOVERY_CHANCE_PARAMETER, { useValue: 80 })
container.register(Tokens.ROOM_DISCOVERY_CHANCE_PARAMETER, { useValue: 36 })
container.register(Tokens.LOOT_KEY_CHANCE_PARAMETER, { useValue: 30 })
container.register(Tokens.LOOT_AXE_CHANCE_PARAMETER, { useValue: 10 })
container.register(Tokens.LOOT_SWORD_CHANCE_PARAMETER, { useValue: 30 })
container.register(Tokens.INVENTORY_MAX_KEY_PARAMETER, { useValue: 1 })
container.register(Tokens.INVENTORY_MAX_WEAPON_PARAMETER, { useValue: 2 })
container.register(Tokens.GOLEM_REWARD_PARAMETER, { useValue: 2 })

// RNG
container.register<IRandomizer>(
  Tokens.RNG,
  { useClass: Randomizer },
  { lifecycle: Lifecycle.Singleton }
)

container.register<WeaponRandomizer>(
  Tokens.WEAPON_RANDOMIZER,
  { useClass: WeaponRandomizer },
  { lifecycle: Lifecycle.Singleton }
)

// repositories
container.register<IPlayers>(
  Tokens.PLAYERS,
  { useClass: Players },
  { lifecycle: Lifecycle.Singleton }
)
container.register<IRooms>(
  Tokens.ROOMS,
  { useClass: Rooms },
  { lifecycle: Lifecycle.Singleton }
)

// logger
container.register<ILogger>(
  Tokens.LOGGER,
  { useClass: ConsoleLogger },
  { lifecycle: Lifecycle.Singleton }
)

// tiles factory
container.register<CorridorBuilder>(CorridorBuilder, { useClass: CorridorBuilder })
container.register<RoomBuilder>(RoomBuilder, { useClass: RoomBuilder })
container.register<TileFactory>(
  Tokens.TILES_FACTORY,
  { useClass: TileFactory }
)

// skeletons factory
container.register<SkeletonFactory>(
  Tokens.SKELETONS_FACTORY,
  { useClass: SkeletonFactory },
  { lifecycle: Lifecycle.Singleton }
)

// loots factory
container.register<WeaponLootBuilder>(WeaponLootBuilder, { useClass: WeaponLootBuilder })
container.register<KeyLootBuilder>(KeyLootBuilder, { useClass: KeyLootBuilder })
container.register<LootFactory>(
  Tokens.LOOTS_FACTORY,
  { useClass: LootFactory },
  { lifecycle: Lifecycle.Singleton }
)

export default container
