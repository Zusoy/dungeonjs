import { Hero } from 'Domain/Model/Player'
import type { IGameEvent } from 'Domain/GameEvent'

export class ChangeHeroEvent implements IGameEvent {
  public readonly tag = 'change_hero'
  constructor(public readonly hero: Hero) {}
}
