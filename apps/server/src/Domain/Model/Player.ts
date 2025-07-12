import type { AppSocket } from 'Application/Websocket/Socket'
import type { Weapon } from 'Domain/Model/Weapon'
import type { VectorTuple } from 'Domain/Geometry/Vector'
import type { ScalarCoords } from 'Domain/Geometry/Coords'

export type Hero = 'rogue' | 'knight' | 'mage' | 'barbarian'

export type Inventory = {
  readonly treasures: number
  readonly keys: number
  readonly weapons: Weapon[]
}

export type PlayerPayload = {
  readonly id: string
  readonly username: string
  readonly color: string
  readonly health: number
  readonly hero: Hero
  readonly position: VectorTuple
  readonly rotation: VectorTuple
  readonly coords: ScalarCoords
  readonly movesCount: number
  readonly inventory: Inventory
  readonly host?: boolean
}

export class Player {
  public health: number = 5

  static fromSocket(socket: AppSocket, color: string, hero: Hero): Player {
    const username = socket.handshake.query.username?.toString() || ''

    return new Player(
      socket.id,
      username,
      color,
      hero,
      { weapons: [], treasures: 0, keys: 0 },
      [0, 0, 0],
      [0, 0, 0],
      [0, 0],
      4
    )
  }

  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly color: string,
    public hero: Hero,
    public inventory: Inventory,
    public position: VectorTuple,
    public rotation: VectorTuple,
    public coords: ScalarCoords,
    public movesCount: number
  ) {
  }

  public addWeapon(weapon: Weapon): void {
    this.inventory = {
      ...this.inventory,
      weapons: [
        ...this.inventory.weapons,
        weapon
      ]
    }
  }

  public removeWeapon(weapon: Weapon): void {
    this.inventory = {
      ...this.inventory,
      weapons: this.inventory.weapons.filter(({ id }) => id !== weapon.id)
    }
  }

  public addTreasure(): void {
    this.inventory = {
      ...this.inventory,
      treasures: this.inventory.treasures + 1
    }
  }

  public addKey(): void {
    this.inventory = {
      ...this.inventory,
      keys: this.inventory.keys + 1
    }
  }

  public removeKey(): void {
    this.inventory = {
      ...this.inventory,
      keys: Math.max(0, this.inventory.keys - 1)
    }
  }

  public getPayload(): PlayerPayload {
    return ({
      username: this.username,
      id: this.id,
      color: this.color,
      health: this.health,
      hero: this.hero,
      position: this.position,
      rotation: this.rotation,
      coords: this.coords,
      movesCount: this.movesCount,
      inventory: this.inventory
    })
  }

  public getRoomPayload(host: boolean): PlayerPayload {
    return ({
      username: this.username,
      id: this.id,
      color: this.color,
      health: this.health,
      hero: this.hero,
      position: this.position,
      rotation: this.rotation,
      coords: this.coords,
      movesCount: this.movesCount,
      inventory: this.inventory,
      host
    })
  }
}
