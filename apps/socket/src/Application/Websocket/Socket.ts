import type { Socket as IOSocket } from 'socket.io'
import type { EventsMap, ClientToServer, ServerToClients, InterServer } from 'Domain/Events'
import type { ISocket } from 'Domain/ISocket'
import type { Room } from 'Domain/Model/Room'
import type { Nullable } from 'utils'

export type AppSocket = IOSocket<ClientToServer, ServerToClients, InterServer>

export class Socket implements ISocket {
  public readonly id: string

  constructor(private readonly io: AppSocket) {
    this.id = io.id
  }

  public get room(): Nullable<string> {
    const rooms = Array.from(this.io.rooms).filter(roomId => roomId !== this.id)

    if (!rooms.length) {
      return null
    }

    return rooms[0]
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
