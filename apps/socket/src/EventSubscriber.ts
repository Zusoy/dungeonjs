import AbstractEventHandler from 'AbstractEventHandler'
import { ClientToServer, clientToServerEvents } from 'Netcode/events'
import { AppSocket } from 'types'

export default class EventSubscriber {
  constructor(private readonly handlers: Iterable<AbstractEventHandler<keyof ClientToServer>>) {}

  subscribe(socket: AppSocket): void {
    const handlers = Array.from(this.handlers)

    for (const event of clientToServerEvents) {
      socket.on(event, payload => {
        const handler = handlers.find(h => h.supports(event, [ payload ], socket))

        if (!handler) {
          console.log('Event not supported', event)
          return
        }

        handler.handle(event, [payload], socket)
      })
    }
  }
}