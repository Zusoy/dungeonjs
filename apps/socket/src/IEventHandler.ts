import type { AppSocket } from 'types/socket'
import type { ClientToServer } from 'Netcode/events'

export default interface IEventHandler<T extends keyof ClientToServer> {
  supports(event: T, payload: Parameters<ClientToServer[T]>, socket: AppSocket): boolean
  handle(event: T, payload: Parameters<ClientToServer[T]>, socket: AppSocket): void
}
