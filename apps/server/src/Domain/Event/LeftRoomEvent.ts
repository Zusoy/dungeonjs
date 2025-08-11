import type { IGameEvent } from 'Domain/GameEvent'

export type LeftRoomReason = 'user_left'|'room_deleted'

export class LeftRoomEvent implements IGameEvent {
  public readonly tag = 'left_room'
  constructor(public readonly reason: LeftRoomReason) {}
}
