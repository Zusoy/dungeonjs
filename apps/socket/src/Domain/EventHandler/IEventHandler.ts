import type { ClientToServer } from 'Domain/Events'
import type { ISocket } from 'Domain/ISocket'

export interface IEventHandler<T extends keyof ClientToServer> {
  supports(channel: T, socket: ISocket, ...payload: Parameters<ClientToServer[T]>): boolean
  handle(channel: T, socket: ISocket, ...payload: Parameters<ClientToServer[T]>): void
}
