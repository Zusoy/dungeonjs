import type { IGameEvent } from 'Domain/GameEvent'

export class CreateRoomEvent implements IGameEvent {
  public readonly tag = 'create_room'
  constructor(public readonly roomId: string) {}
}
