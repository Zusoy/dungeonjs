import INetcodeItem from 'Netcode/INetcodeItem'

export default interface ICollection<T extends INetcodeItem> extends Iterable<T> {
  add(item: T): void
  find(id: string): T|null
  remove(item: T): void
  update(item: T, index: number): void
}
