import { injectable } from 'tsyringe'
import type IServer from 'IServer'
import type { AppServer } from 'types/socket'
import type { ServerToClients } from 'Netcode/events'
import type Room from 'Netcode/Room'
import { UserPayload } from 'Netcode/User'

@injectable()
export default class Server implements IServer {
  constructor(private readonly io: AppServer) {}

  emit<T extends keyof ServerToClients>(channel: T, ...args: Parameters<ServerToClients[T]>): void {
    this.io.emit(channel, ...args)
  }

  emitInRoom<T extends keyof ServerToClients>(channel: T, room: Room, ...args: Parameters<ServerToClients[T]>): void {
    this.io.in(room.roomId).emit(channel, ...args)
  }

  fetchSocketIds(room: Room): Promise<Iterable<UserPayload['id']>> {
    return this.io.in(room.roomId)
      .fetchSockets()
      .then(sockets => sockets.map(socket => socket.id))
  }

  kick(room: Room): void {
    this.io.in(room.roomId).socketsLeave(room.roomId)
  }
}
