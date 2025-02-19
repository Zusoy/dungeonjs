import { injectable, injectAll } from 'tsyringe'
import type IEventHandler from 'IEventHandler'
import type { AppSocket } from 'types'
import { type ClientToServer, clientToServerEvents } from 'Netcode/events'

@injectable()
export default class EventSubscriber {
  constructor(
    @injectAll('handlers')
    private readonly handlers: IEventHandler<keyof ClientToServer>[]
  ) {
  }

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