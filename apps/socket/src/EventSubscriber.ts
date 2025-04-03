import { injectable, injectAll } from 'tsyringe'
import type IEventHandler from 'IEventHandler'
import type { AppSocket } from 'types/socket'
import { type ClientToServer, clientToServerEvents } from 'Netcode/events'
import Socket from 'Websocket/Socket'

@injectable()
export default class EventSubscriber {
  constructor(
    @injectAll('handlers')
    private readonly handlers: IEventHandler<keyof ClientToServer>[]
  ) {
  }

  subscribe(socket: AppSocket): void {
    const handlers = Array.from(this.handlers)
    const appSocket = new Socket(socket)

    for (const event of clientToServerEvents) {
      socket.on(event, payload => {
        const handler = handlers.find(h => h.supports(event, [ payload ], appSocket))

        if (!handler) {
          console.log('Event not supported', event)
          return
        }

        handler.handle(event, [payload], appSocket)
      })
    }
  }
}