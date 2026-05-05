import { z } from 'zod'
import type { AppSocket } from 'Infra/Websocket/InputOutputSocket'
import { WeaponSchema, type Weapon } from 'Domain/Model/Weapon'
import { VectorSchema, type VectorTuple } from 'Domain/Geometry/Vector'
import { ScalarCoordsSchema, type ScalarCoords } from 'Domain/Geometry/Coords'

export const HeroSchema = z.literal(['rogue', 'knight', 'mage', 'barbarian'])
export type Hero = z.infer<typeof HeroSchema>

export const InventorySchema = z.object({
  treasures: z.number(),
  keys: z.number(),
  weapons: z.array(WeaponSchema)
})

export type Inventory = z.infer<typeof InventorySchema>

export const PlayerPayloadSchema = z.object({
  id: z.string().nonempty(),
  username: z.string().nonempty(),
  color: z.string().nonempty(),
  health: z.number(),
  hero: HeroSchema,
  position: VectorSchema,
  rotation: VectorSchema,
  coords: ScalarCoordsSchema,
  movesCount: z.number(),
  inventory: InventorySchema,
  host: z.boolean().optional()
})

export type PlayerPayload = z.infer<typeof PlayerPayloadSchema>

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

  public reset(): void {
    this.position = [0, 0, 0]
    this.coords = [0, 0]
    this.health = 5
    this.inventory = { treasures: 0, weapons: [], keys: 0 }
    this.movesCount = 4
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

  public addTreasures(treasures: number): void {
    this.inventory = {
      ...this.inventory,
      treasures: this.inventory.treasures + treasures
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
