import type { IGameEvent } from 'Domain/GameEvent'
import type { Chest } from 'Domain/Model/Chest'

export class PickChestEvent implements IGameEvent {
  public readonly tag = 'pick_chest'
  constructor(public readonly chestId: Chest['id']) {}
}
