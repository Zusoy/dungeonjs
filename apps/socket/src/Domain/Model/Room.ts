import { Coords, type ScalarCoords } from 'Domain/Geometry/Coords'
import type { Skeleton } from 'Domain/Model/Skeleton'
import type { Nullable } from 'utils'

export class Room {
  private enemies: Skeleton[] = []

  constructor(
    public readonly roomId: string,
    public readonly createdById: string
  ) {
  }

  public getId(): string {
    return this.roomId
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

  public findEnemyAtCoords(coords: ScalarCoords): Nullable<Skeleton> {
    const targetCoords = Coords.fromScalar(coords)

    return this.enemies.find(enemy => {
      const enemyCoord = Coords.fromScalar(enemy.coords)
      return targetCoords.equals(enemyCoord)
    }) ?? null
  }
}
