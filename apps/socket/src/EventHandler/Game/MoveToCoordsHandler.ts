import AbstractEventHandler from 'AbstractEventHandler'
import { MoveToCoordsPayload, AppSocket, TileType, Direction } from 'types'

export default class MoveToCoordsHandler extends AbstractEventHandler<'moveToCoords'> {
  supports(event: 'moveToCoords', _payload: [payload: MoveToCoordsPayload], _socket: AppSocket): boolean {
    return event === 'moveToCoords'
  }

  handle(_event: 'moveToCoords', payload: [payload: MoveToCoordsPayload], socket: AppSocket): void {
    const [movePayload] = payload
    const room = Array.from(socket.rooms).find(room => !!this.rooms.find(room))
    const origin = Direction.getReverse(movePayload.fromDirection)

    if (!room) {
      return
    }

    this.server.in(room).emit('discoverTile', {
      id: Date.now().toString(),
      type: TileType.Room,
      directions: [origin],
      coords: movePayload.coords
    })
  }
}
