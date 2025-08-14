import { ScalarCoords } from 'Domain/Geometry/Coords'
import { Loot, LootableKey, LootableWeapon, WeaponLoot, WorldLoot } from 'Domain/Model/Loot'
import { Player } from 'Domain/Model/Player'
import { MinionSkeleton, Skeleton, Golem } from 'Domain/Model/Skeleton'
import { Dagger } from 'Domain/Model/Weapon'

export const createPlayerMock = (id: string, username: string, coords: ScalarCoords = [0, 0]): Player => {
  return new Player(
    id,
    username,
    '#ffff',
    'barbarian',
    { weapons: [], treasures: 0, keys: 0 },
    [0, 0, 0],
    [0, 0, 0],
    coords,
    4
  )
}

export const createWeaponLootMock = (id: string): WeaponLoot => {
  return new WeaponLoot(
    new Dagger(id)
  )
}

export const createLootableWeaponMock = (id: string, coords: ScalarCoords): WorldLoot => {
  return new LootableWeapon(
    new Dagger(id),
    coords
  )
}

export const createLootableKeyMock = (id: string, coords: ScalarCoords): WorldLoot => {
  return new LootableKey(
    { id },
    coords
  )
}

export const createMinionSkeletonMock = (id: string, loot: Loot): Skeleton => {
  return new MinionSkeleton(id, [0, 0], loot)
}

export const createGolemSkeletonMock = (id: string, loot: Loot): Skeleton => {
  return new Golem(id, [0, 0], loot)
}
