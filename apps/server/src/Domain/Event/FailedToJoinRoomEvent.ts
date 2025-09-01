import type { IGameEvent } from 'Domain/GameEvent'

export type JoinRoomErrorCode = 'room_not_found' | 'max_players'

export class FailedToJoinRoomEvent implements IGameEvent {
  public readonly tag = 'join_room_failed'

  constructor(
    public readonly roomId: string,
    public readonly code: JoinRoomErrorCode
  ) {}
}
