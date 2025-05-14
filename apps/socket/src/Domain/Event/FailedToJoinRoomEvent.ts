export type JoinRoomErrorCode = 'room_not_found'

export type FailedToJoinRoomEvent = {
  readonly roomId: string
  readonly code: JoinRoomErrorCode
}
