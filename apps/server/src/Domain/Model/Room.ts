import { Coords, type ScalarCoords } from 'Domain/Geometry/Coords'
import { SkeletonType, type Skeleton } from 'Domain/Model/Skeleton'
import type { Nullable } from 'utils'
import type { WorldLoot } from 'Domain/Model/Loot'
import type { Chest } from 'Domain/Model/Chest'

export class Room {
  private enemies: Skeleton[] = []
  private loots: WorldLoot[] = []
  private chests: Chest[] = []

  constructor(
    public readonly roomId: string,
    public readonly createdById: string
  ) {
  }

  public addEnemy(enemy: Skeleton): void {
    this.enemies = [...this.enemies, enemy]
  }

  public removeEnemy(enemyId: Skeleton['id']): void {
    this.enemies = this.enemies.filter(enemy => enemy.id !== enemyId)
  }

  public findEnemy(enemyId: Skeleton['id']): Nullable<Skeleton> {
    return this.enemies.find(enemy => enemy.id === enemyId) ?? null
  }

  public getEnemies(): Skeleton[] {
    return this.enemies
  }

  public hasGolem(): boolean {
    return !!this.enemies.find(enemy => enemy.type === SkeletonType.Golem)
  }

  public addLoot(loot: WorldLoot): void {
    this.loots = [...this.loots, loot]
  }

  public removeLoot(lootId: WorldLoot['id']): void {
    this.loots = this.loots.filter(loot => loot.id !== lootId)
  }

  public findLoot(lootId: WorldLoot['id']): Nullable<WorldLoot> {
    return this.loots.find(loot => loot.id === lootId) ?? null
  }

  public getLoots(): WorldLoot[] {
    return this.loots
  }

  public addChest(chest: Chest): void {
    this.chests = [...this.chests, chest]
  }

  public removeChest(chestId: Chest['id']): void {
    this.chests = this.chests.filter(chest => chest.id !== chestId)
  }

  public findChest(chestId: Chest['id']): Nullable<Chest> {
    return this.chests.find(chest => chest.id === chestId) || null
  }

  public getChests(): Chest[] {
    return this.chests
  }

  public findEnemyAtCoords(coords: ScalarCoords): Nullable<Skeleton> {
    const targetCoords = Coords.fromScalar(coords)

    return this.enemies.find(enemy => {
      const enemyCoords = Coords.fromScalar(enemy.coords)
      return targetCoords.equals(enemyCoords)
    }) ?? null
  }

  public findLootAtCoords(coords: ScalarCoords): Nullable<WorldLoot> {
    const targetCoords = Coords.fromScalar(coords)

    return this.loots.find(loot => {
      const lootCoords = Coords.fromScalar(loot.coords)
      return targetCoords.equals(lootCoords)
    }) ?? null
  }
}
