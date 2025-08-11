import type { IGameEvent } from 'Domain/GameEvent'
import type { PlayerPayload } from 'Domain/Model/Player'

export class PlayersEvent implements IGameEvent {
  public readonly tag = 'players'
  constructor(public readonly players: Iterable<PlayerPayload>) {}
}
