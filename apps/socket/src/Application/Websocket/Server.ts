import { injectable } from 'tsyringe'
import type { Server as IOServer } from 'socket.io'
import type { ServerToClients, ClientToServer, InterServer } from 'Domain/Events'
import type { IServer } from 'Domain/IServer'
import type { Room } from 'Domain/Model/Room'
import type { PlayerPayload } from 'Domain/Model/Player'

export type AppServer = IOServer<ClientToServer, ServerToClients, InterServer>

@injectable()
export class Server implements IServer {
  constructor(private readonly io: AppServer) {}

  emit<T extends keyof ServerToClients>(channel: T, ...args: Parameters<ServerToClients[T]>): void {
    this.io.emit(channel, ...args)
  }

  emitInRoom<T extends keyof ServerToClients>(channel: T, room: Room, ...args: Parameters<ServerToClients[T]>): void {
    this.io.in(room.roomId).emit(channel, ...args)
  }

  fetchSocketIds(room: Room): Promise<Iterable<PlayerPayload['id']>> {
    return this.io.in(room.roomId)
      .fetchSockets()
      .then(sockets => sockets.map(socket => socket.id))
  }

  kickAll(room: Room): void {
    this.io.in(room.roomId).socketsLeave(room.roomId)
  }
}
