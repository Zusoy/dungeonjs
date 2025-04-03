import type ISocket from 'ISocket'
import type { ClientToServer } from 'Netcode/events'

export default interface IEventHandler<T extends keyof ClientToServer> {
  supports(event: T, payload: Parameters<ClientToServer[T]>, socket: ISocket): boolean
  handle(event: T, payload: Parameters<ClientToServer[T]>, socket: ISocket): void
}
