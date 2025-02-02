import AbstractEventHandler from 'AbstractEventHandler'
import { MoveToCoordsPayload, AppSocket } from 'types'

export default class MoveToCoordsHandler extends AbstractEventHandler<'moveToCoords'> {
  supports(event: 'moveToCoords', _payload: [payload: MoveToCoordsPayload], _socket: AppSocket): boolean {
    return event === 'moveToCoords'
  }

  handle(_event: 'moveToCoords', payload: [payload: MoveToCoordsPayload], socket: AppSocket): void {
    const [movePayload] = payload

    console.log('Move to coords', movePayload)
  }
}
