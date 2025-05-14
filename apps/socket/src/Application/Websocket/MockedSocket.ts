import type { EventsMap } from 'Domain/Events'
import type { ISocket } from 'Domain/ISocket'
import type { Room } from 'Domain/Model/Room'

export class MockedSocket implements ISocket {
  public readonly emittedEvents: string[] = []
  constructor(public readonly id: string, public readonly rooms: string[]) {}

  emit<T extends keyof EventsMap>(channel: T, ..._args: Parameters<EventsMap[T]>): void {
    this.emittedEvents.push(channel)
  }

  join(room: Room): void {
    this.rooms.push(room.roomId)
  }

  leave(room: Room): void {
    const index = this.rooms.findIndex(r => r === room.roomId)
    this.rooms.splice(index, 1)
  }
}
