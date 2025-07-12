export type JoinRoomErrorCode = 'room_not_found' | 'max_players'

export type FailedToJoinRoomEvent = {
  readonly roomId: string
  readonly code: JoinRoomErrorCode
}
