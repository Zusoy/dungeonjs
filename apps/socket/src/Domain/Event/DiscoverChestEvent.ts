import type { Chest } from 'Domain/Model/Chest'

export type DiscoverChestEvent = {
  readonly chest: Chest
}
