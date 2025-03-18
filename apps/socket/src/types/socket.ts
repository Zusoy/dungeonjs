import type { Server, Socket } from 'socket.io'
import type { ServerToClients, ClientToServer, InterServer } from 'Netcode/events'

export type AppServer = Server<ClientToServer, ServerToClients, InterServer>
export type AppSocket = Socket<ClientToServer, ServerToClients, InterServer>
