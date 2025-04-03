import type Room from 'Netcode/Room'
import type { ServerToClients } from 'Netcode/events'
import type { UserPayload } from 'Netcode/User'

export default interface IServer {
  emit<T extends keyof ServerToClients>(channel: T, ...args: Parameters<ServerToClients[T]>): void
  emitInRoom<T extends keyof ServerToClients>(channel: T, room: Room, ...args: Parameters<ServerToClients[T]>): void
  fetchSocketIds(room: Room): Promise<Iterable<UserPayload['id']>>
  kick(room: Room): void
}
