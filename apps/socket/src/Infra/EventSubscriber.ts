import { injectable, injectAll } from 'tsyringe'
import { Socket, type AppSocket } from 'Application/Websocket/Socket'
import { type ClientToServer, clientToServerEvents } from 'Domain/Events'
import type { IEventHandler } from 'Domain/EventHandler/IEventHandler'

@injectable()
export class EventSubscriber {
  constructor(
    @injectAll('handlers')
    private readonly handlers: IEventHandler<keyof ClientToServer>[]
  ) {
  }

  subscribe(socket: AppSocket): void {
    const handlers = Array.from(this.handlers)
    const appSocket = new Socket(socket)

    for (const event of clientToServerEvents) {
      // @ts-expect-error
      socket.on(event, payload => {
        const handler = handlers.find(h => h.supports(event, appSocket, payload))

        if (!handler) {
          console.log('Event not supported', event)
          return
        }

        handler.handle(event, appSocket, payload)
      })
    }
  }
}
