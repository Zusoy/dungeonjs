import AbstractEventHandler from 'AbstractEventHandler'
import { MoveToCoordsPayload, AppSocket, TileType, Direction } from 'types'

export default class MoveToCoordsHandler extends AbstractEventHandler<'moveToCoords'> {
  supports(event: 'moveToCoords', _payload: [payload: MoveToCoordsPayload], _socket: AppSocket): boolean {
    return event === 'moveToCoords'
  }

  handle(_event: 'moveToCoords', payload: [payload: MoveToCoordsPayload], socket: AppSocket): void {
    const [movePayload] = payload
    const roomId = Array.from(socket.rooms).find(room => !!this.rooms.find(room))
    const origin = Direction.opposite(movePayload.fromDirection)
    const user = this.users.find(socket.id)
    const userIndex = Array.from(this.users).findIndex(user => user.id === socket.id)

    if (!roomId || !user || userIndex < 0) {
      return
    }

    const room = this.rooms.find(roomId)

    if (!room) {
      return
    }

    if (movePayload.uncharted) {
      this.server.in(room.roomId).emit('discoverTile', {
        id: Date.now().toString(),
        type: TileType.Room,
        directions: [origin],
        coords: movePayload.coords
      })
    }

    user.position = [
      movePayload.coords[0] * 8,
      user.position[1],
      movePayload.coords[1] * 8
    ]

    user.coords = movePayload.coords
    user.movesCount = Math.max(0, user.movesCount - 1)
    this.users.update(user, userIndex)

    this.server.in(room.roomId).fetchSockets()
      .then(sockets => {
        const roomUsers = sockets
          .map(({ id }) => id)
          .map(id => this.users.find(id))
          .filter(u => !!u)
          .map(u => u.getRoomPayload(u.id === room.createdById))

        this.server.in(room.roomId).emit('players', roomUsers)
      })

    if (user.movesCount === 0) {
      this.server.in(room.roomId).fetchSockets()
        .then(sockets => {
          const ids = sockets.map(({ id }) => id)
          const index = ids.findIndex(id => id === socket.id)
          const newPlayerIndex = index === ids.length - 1 ? 0 : index + 1
          this.server.in(room.roomId).emit('playerTurn', ids[newPlayerIndex])
        })
    }
  }
}
