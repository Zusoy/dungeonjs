import type { IServer } from 'Domain/IServer'
import type { ServerToClients } from 'Domain/Events'
import type { PlayerPayload } from 'Domain/Model/Player'
import type { Room } from 'Domain/Model/Room'

export class MockedServer implements IServer {
  public readonly kickedRooms: string[] = []
  public readonly emittedEvents: string[] = []
  public readonly roomEmittedEvents: Record<string, string[]> = {}
  public readonly roomEmittedEventPayloads: Record<string, Array<{ event: string, payload: any }>> = {}

  constructor(private readonly socketIds: string[] = []) {}

  emit<T extends keyof ServerToClients>(channel: T, ..._args: Parameters<ServerToClients[T]>): void {
    this.emittedEvents.push(channel)
  }

  emitInRoom<T extends keyof ServerToClients>(channel: T, room: Room, ...args: Parameters<ServerToClients[T]>): void {
    if (!this.roomEmittedEvents[room.roomId]) {
      this.roomEmittedEvents[room.roomId] = []
    }

    if (!this.roomEmittedEventPayloads[room.roomId]) {
      this.roomEmittedEventPayloads[room.roomId] = []
    }

    this.roomEmittedEvents[room.roomId].push(channel)
    this.roomEmittedEventPayloads[room.roomId].push({ event: channel, payload: args[0] })
  }

  fetchSocketIds(_room: Room): Promise<Iterable<PlayerPayload['id']>> {
    return Promise.resolve(this.socketIds)
  }

  kickAll(room: Room): void {
    this.kickedRooms.push(room.roomId)
  }
}
