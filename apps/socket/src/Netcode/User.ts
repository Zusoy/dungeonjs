import type { AppSocket } from 'types/socket'
import type { ScalarCoords } from 'types/coords'
import type { VectorTuple } from 'types/utils'
import { Axe, Dagger, Sword, type Weapon } from 'Netcode/Weapon'
import type INetcodeItem from 'Netcode/INetcodeItem'

export type Hero = 'rogue'|'knight'|'mage'|'barbarian'

export type Inventory = {
  readonly treasures: number
  readonly weapons: Weapon[]
}

export type UserPayload = {
  readonly id: string
  readonly username: string
  readonly color: string
  readonly hero: Hero
  readonly position: VectorTuple
  readonly rotation: VectorTuple
  readonly coords: ScalarCoords
  readonly movesCount: number
  readonly inventory: Inventory
  readonly host?: boolean
}

export default class User implements INetcodeItem {
  static fromSocket(socket: AppSocket, color: string, hero: Hero): User {
    const username = socket.handshake.query.username?.toString() || ''

    return new User(
      socket.id,
      username,
      color,
      hero,
      { weapons: [
        new Sword(Date.now().toString()),
        new Dagger(Date.now().toString()),
        new Axe(Date.now().toString())
      ], treasures: 0 },
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

  public getId(): string {
    return this.id
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

  public getPayload(): UserPayload {
    return ({
      username: this.username,
      id: this.id,
      color: this.color,
      hero: this.hero,
      position: this.position,
      rotation: this.rotation,
      coords: this.coords,
      movesCount: this.movesCount,
      inventory: this.inventory
    })
  }

  public getRoomPayload(host: boolean): UserPayload {
    return ({
      username: this.username,
      id: this.id,
      color: this.color,
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
