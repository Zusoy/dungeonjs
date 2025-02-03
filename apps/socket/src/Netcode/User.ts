import { AppSocket, Coords } from 'types'
import INetcodeItem from 'Netcode/INetcodeItem'

export type VectorTuple = [x: number, y: number, z: number]
export type Hero = 'rogue'|'knight'|'mage'|'barbarian'

export type UserPayload = {
  readonly id: string
  readonly username: string
  readonly color: string
  readonly hero: Hero
  readonly position: VectorTuple
  readonly rotation: VectorTuple
  readonly coords: Coords
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
      [0, 0, 0],
      [0, 0, 0],
      [0, 0]
    )
  }

  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly color: string,
    public hero: Hero,
    public position: VectorTuple,
    public rotation: VectorTuple,
    public coords: Coords
  ) {
  }

  public getId(): string {
    return this.id
  }

  public getPayload(): UserPayload {
    return ({
      username: this.username,
      id: this.id,
      color: this.color,
      hero: this.hero,
      position: this.position,
      rotation: this.rotation,
      coords: this.coords
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
      host
    })
  }
}
