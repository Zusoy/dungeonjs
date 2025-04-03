import type Room from 'Netcode/Room'
import type { EventsMap } from 'Netcode/events'

export default interface ISocket {
  readonly id: string
  readonly rooms: string[]
  emit<T extends keyof EventsMap>(channel: T, ...args: Parameters<EventsMap[T]>): void
  join(room: Room): void
  leave(room: Room): void
}
