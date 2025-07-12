import { injectable } from 'tsyringe'
import type { Disposable as IDisposable } from 'tsyringe'
import type { Server } from 'socket.io'
import type { IServer } from 'Domain/IServer'
import type { ClientToServer, InterServer, ServerToClients } from 'Domain/Events'
import type { Room } from 'Domain/Model/Room'
import type { PlayerPayload } from 'Domain/Model/Player'

export type AppServer = Server<ClientToServer, ServerToClients, InterServer>

@injectable()
export class InputOutputServer implements IServer, IDisposable {
  constructor(private readonly io: AppServer) { }

  emit<T extends keyof ServerToClients>(channel: T, ...args: Parameters<ServerToClients[T]>): void {
    this.io.emit(channel, ...args)
  }

  emitInRoom<T extends keyof ServerToClients>(channel: T, room: Room, ...args: Parameters<ServerToClients[T]>): void {
    this.io.in(room.roomId).emit(channel, ...args)
  }

  async fetchSocketIds(room: Room): Promise<Iterable<PlayerPayload['id']>> {
    const sockets = await this.io.in(room.roomId).fetchSockets()
    return sockets.map(socket => socket.id)
  }

  kickAll(room: Room): void {
    this.io.in(room.roomId).socketsLeave(room.roomId)
  }

  dispose(): Promise<void> | void {
    this.io.close()
  }
}
