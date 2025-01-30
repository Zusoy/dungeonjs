export default interface ICollection<T> extends Iterable<T> {
  add(item: T): void
  remove(item: T): void
  update(item: T, index: number): void
}
