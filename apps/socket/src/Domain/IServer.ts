import type { ServerToClients } from 'Domain/Events'
import type { Room } from 'Domain/Model/Room'
import type { PlayerPayload } from 'Domain/Model/Player'

export interface IServer {
  emit<T extends keyof ServerToClients>(channel: T, ...args: Parameters<ServerToClients[T]>): void
  emitInRoom<T extends keyof ServerToClients>(channel: T, room: Room, ...args: Parameters<ServerToClients[T]>): void
  fetchSocketIds(room: Room): Promise<Iterable<PlayerPayload['id']>>
  kickAll(room: Room): void
}
