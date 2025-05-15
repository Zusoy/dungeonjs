import type { IServer } from 'Domain/IServer'
import { ServerToClients } from 'Domain/Events'
import { PlayerPayload } from 'Domain/Model/Player'
import { Room } from 'Domain/Model/Room'

export class MockedServer implements IServer {
  public readonly kickedRooms: string[] = []
  public readonly emittedEvents: string[] = []
  public readonly roomEmittedEvents: Record<string, string[]> = {}

  constructor(private readonly socketIds: string[] = []) {}

  emit<T extends keyof ServerToClients>(channel: T, ..._args: Parameters<ServerToClients[T]>): void {
    this.emittedEvents.push(channel)
  }

  emitInRoom<T extends keyof ServerToClients>(channel: T, room: Room, ..._args: Parameters<ServerToClients[T]>): void {
    if (!this.roomEmittedEvents[room.roomId]) {
      this.roomEmittedEvents[room.roomId] = []
    }

    this.roomEmittedEvents[room.roomId].push(channel)
  }

  fetchSocketIds(_room: Room): Promise<Iterable<PlayerPayload['id']>> {
    return Promise.resolve(this.socketIds)
  }

  kickAll(room: Room): void {
    this.kickedRooms.push(room.roomId)
  }
}
