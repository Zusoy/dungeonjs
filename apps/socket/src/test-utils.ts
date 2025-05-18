import { Loot, WeaponLoot } from 'Domain/Model/Loot'
import { Player } from 'Domain/Model/Player'
import { MinionSkeleton, Skeleton } from 'Domain/Model/Skeleton'
import { Dagger } from 'Domain/Model/Weapon'

export const createPlayerMock = (id: string, username: string): Player => {
  return new Player(
    id,
    username,
    '#ffff',
    'barbarian',
    { weapons: [], treasures: 0 },
    [0, 0, 0],
    [0, 0, 0],
    [0, 0],
    4
  )
}

export const createWeaponLootMock = (id: string): WeaponLoot => {
  return new WeaponLoot(
    new Dagger(id)
  )
}

export const createMinionSkeletonMock = (id: string, loot: Loot): Skeleton => {
  return new MinionSkeleton(id, [0, 0], loot)
}
