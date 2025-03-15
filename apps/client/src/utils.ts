// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isEnumValue<T extends object>(value: any, enumObject: T): value is T[keyof T] {
  return Object.values(enumObject).includes(value)
}
