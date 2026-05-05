export interface ISerializer<T> {
  serialize(value: string): T
}
