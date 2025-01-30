import type { ClientToServer } from 'Netcode/events'
import type { AppServer, AppSocket } from 'types'
import ICollection from 'Netcode/Collection/ICollection'
import User from 'Netcode/User'
import Room from 'Netcode/Room'

export default abstract class AbstractEventHandler<T extends keyof ClientToServer> {
  constructor(
    protected readonly server: AppServer,
    protected readonly users: ICollection<User>,
    protected readonly rooms: ICollection<Room>
  ) {}

  abstract supports(event: T, payload: Parameters<ClientToServer[T]>, socket: AppSocket): boolean
  abstract handle(event: T, payload: Parameters<ClientToServer[T]>, socket: AppSocket): void
}
