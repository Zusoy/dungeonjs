import type { AppSocket } from 'types/socket'
import type { EventsMap } from 'Netcode/events'
import type ISocket from 'ISocket'
import type Room from 'Netcode/Room'

export default class Socket implements ISocket {
  public readonly id: string

  constructor(private readonly io: AppSocket) {
    this.id = io.id
  }

  public get rooms(): string[] {
    return Array.from(this.io.rooms)
  }

  emit<T extends keyof EventsMap>(channel: T, ...args: Parameters<EventsMap[T]>): void {
    this.io.emit(channel, ...args)
  }

  join(room: Room): void {
    this.io.join(room.roomId)
  }

  leave(room: Room): void {
    this.io.leave(room.roomId)
  }
}
