import type { IGameEvent } from 'Domain/GameEvent'

export class JoinRoomEvent implements IGameEvent {
  public readonly tag = 'join_room'
  constructor(public readonly roomId: string) {}
}
