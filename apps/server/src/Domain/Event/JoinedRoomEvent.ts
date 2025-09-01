import type { IGameEvent } from 'Domain/GameEvent'

export class JoinedRoomEvent implements IGameEvent {
  public readonly tag = 'joined_room'
  constructor(public readonly roomId: string) {}
}
