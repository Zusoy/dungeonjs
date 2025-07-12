import type { Skeleton } from 'Domain/Model/Skeleton'

export type SkeletonsEvent = {
  readonly skeletons: Iterable<Skeleton>
}
