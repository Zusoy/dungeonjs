import type { Room } from 'Domain/Model/Room'
import type { EventsMap } from 'Domain/Events'

export interface ISocket {
  readonly id: string
  readonly rooms: string[]
  emit<T extends keyof EventsMap>(channel: T, ...args: Parameters<EventsMap[T]>): void
  join(room: Room): void
  leave(room: Room): void
}
