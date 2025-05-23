import type { Chest } from 'Domain/Model/Chest'

export type PickChestEvent = {
  readonly chestId: Chest['id']
}
