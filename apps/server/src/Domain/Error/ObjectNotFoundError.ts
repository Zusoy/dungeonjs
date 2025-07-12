export class ObjectNotFoundError extends Error {
  public readonly name = "ObjectNotFoundError"

  constructor(public readonly objectName: string, public readonly objectIdentifier: string) {
    super(`${objectName} with identifier ${objectIdentifier} not found.`)
  }
}
