export class PlayerNotInRoomError extends Error {
  constructor(public readonly playerId: string) {
    super(`Player ${playerId} is not in any room`)
  }
}
