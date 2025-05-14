export type LeftRoomReason = 'user_left'|'room_deleted'

export type LeftRoomEvent = {
  readonly reason: LeftRoomReason
}
