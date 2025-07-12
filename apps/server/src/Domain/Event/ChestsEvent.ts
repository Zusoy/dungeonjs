import type { Chest } from 'Domain/Model/Chest'

export type ChestsEvent = {
  readonly chests: Iterable<Chest>
}
