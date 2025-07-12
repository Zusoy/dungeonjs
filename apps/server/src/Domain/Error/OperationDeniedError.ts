export class OperationDeniedError extends Error {
  public readonly name = "OperationDeniedError"

  constructor() {
    super("Operation denied")
  }
}
