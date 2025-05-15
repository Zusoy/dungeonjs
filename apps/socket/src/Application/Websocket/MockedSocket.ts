import type { EventsMap } from 'Domain/Events'
import type { ISocket } from 'Domain/ISocket'
import type { Room } from 'Domain/Model/Room'
import type { Nullable } from 'utils'

export class MockedSocket implements ISocket {
  public readonly emittedEvents: string[] = []
  constructor(public readonly id: string, private joinedRoom: Nullable<string>) {}

  public get room(): Nullable<string> {
    return this.joinedRoom
  }

  emit<T extends keyof EventsMap>(channel: T, ..._args: Parameters<EventsMap[T]>): void {
    this.emittedEvents.push(channel)
  }

  join(room: Room): void {
    this.joinedRoom = room.roomId
  }

  leave(_room: Room): void {
    this.joinedRoom = null
  }
}
