import type { IGameEvent } from 'Domain/GameEvent'
import type { Skeleton } from 'Domain/Model/Skeleton'

export class SkeletonsEvent implements IGameEvent {
  public readonly tag = 'skeletons'
  constructor(public readonly skeletons: Iterable<Skeleton>) {}
}
