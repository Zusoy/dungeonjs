import type { IGameEvent } from 'Domain/GameEvent'

export class LeaveRoomEvent implements IGameEvent {
  public readonly tag = 'leave_room'
  constructor(public readonly roomId: string) {}
}
