import type { Socket as IOSocket } from 'socket.io'
import type { EventsMap, ClientToServer, ServerToClients, InterServer } from 'Domain/Events'
import type { ISocket } from 'Domain/ISocket'
import type { Room } from 'Domain/Model/Room'

export type AppSocket = IOSocket<ClientToServer, ServerToClients, InterServer>

export class Socket implements ISocket {
  public readonly id: string

  constructor(private readonly io: AppSocket) {
    this.id = io.id
  }

  public get rooms(): string[] {
    return Array.from(this.io.rooms)
  }

  emit<T extends keyof EventsMap>(channel: T, ...args: Parameters<EventsMap[T]>): void {
    // @ts-expect-error
    this.io.emit(channel, ...args)
  }

  join(room: Room): void {
    this.io.join(room.roomId)
  }

  leave(room: Room): void {
    this.io.leave(room.roomId)
  }
}
