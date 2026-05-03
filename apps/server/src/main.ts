import container from 'container'
import { createServer } from 'http'
import { Server as IOServer } from 'socket.io'
import { createAdapter } from '@socket.io/redis-adapter'
import type { ClientToServer, ServerToClients, InterServer } from 'Domain/Events'
import * as EventHandlers from 'Domain/EventHandler'
import { IPlayers } from 'Domain/Repository/IPlayers'
import { IRooms } from 'Domain/Repository/IRooms'
import { ILogger } from 'Domain/ILogger'
import { InputOutputServer } from 'Infra/Websocket/InputOutputServer'
import { PlayerBroadcaster } from 'Application/Notification/PlayerBroadcaster'
import { TurnAllocator } from 'Application/Notification/TurnAllocator'
import { IServer } from 'Domain/IServer'
import { EventSubscriber } from 'Infra/EventSubscriber'
import { Player } from 'Domain/Model/Player'
import { ITurnAllocator } from 'Domain/Notification/ITurnAllocator'
import { IPlayerBroadcaster } from 'Domain/Notification/IPlayerBroadcaster'
import { PlayersEvent } from 'Domain/Event/PlayersEvent'
import { LeftRoomEvent } from 'Domain/Event/LeftRoomEvent'
import * as Tokens from 'Domain/tokens'
import { Factory as BrokerFactory } from 'Infra/Redis/Client/Factory'
import { Client } from 'Infra/Redis/Client/Client'
import { createClient } from 'redis'
import { Players } from 'Infra/Repository/Players'
import { Rooms } from 'Infra/Repository/Rooms'
import { PlayerSerializer } from 'Infra/Serializer/PlayerSerializer'
import { RoomSerializer } from 'Infra/Serializer/RoomSerializer'

const httpServer = createServer((_, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Request-Method', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.writeHead(200)
  res.end()
})

const logger = container.resolve<ILogger>(Tokens.LOGGER)
const playerSerializer = container.resolve<PlayerSerializer>(Tokens.PLAYER_SERIALIZER)
const roomSerializer = container.resolve<RoomSerializer>(Tokens.ROOM_SERIALIZER)

// bootstrap (temp)
const pubClient = createClient({ url: 'redis://redis:6379' })
const subClient = pubClient.duplicate()

await Promise.all([
  pubClient.connect(),
  subClient.connect()
])

const io = new IOServer<ClientToServer, ServerToClients, InterServer>(
  httpServer,
  { adapter: createAdapter(pubClient, subClient) }
)

const broker = await BrokerFactory.create('redis://redis:6379')
const brokerClient = new Client(broker)
await brokerClient.connect().catch(e => logger.error(e))

const players = new Players(brokerClient, playerSerializer)
const rooms = new Rooms(brokerClient, roomSerializer)

// repositories
container.register<IPlayers>(
  Tokens.PLAYERS,
  { useValue: players }
)

container.register<IRooms>(
  Tokens.ROOMS,
  { useValue: rooms }
)

const server = new InputOutputServer(io)
container.register<Client>(Tokens.BROKER, { useValue: brokerClient })
container.register<IServer>(Tokens.SERVER, { useValue: server })
container.register<IPlayerBroadcaster>(Tokens.BROADCASTER, { useClass: PlayerBroadcaster })
container.register<ITurnAllocator>(Tokens.TURN_ALLOCATOR, { useClass: TurnAllocator })

container.register<EventHandlers.ChangeHeroHandler>(EventHandlers.ChangeHeroHandler, { useClass: EventHandlers.ChangeHeroHandler })
container.register<EventHandlers.MoveHandler>(EventHandlers.MoveHandler, { useClass: EventHandlers.MoveHandler })
container.register<EventHandlers.StartGameHandler>(EventHandlers.StartGameHandler, { useClass: EventHandlers.StartGameHandler })
container.register<EventHandlers.CreateRoomHandler>(EventHandlers.CreateRoomHandler, { useClass: EventHandlers.CreateRoomHandler })
container.register<EventHandlers.JoinRoomHandler>(EventHandlers.JoinRoomHandler, { useClass: EventHandlers.JoinRoomHandler })
container.register<EventHandlers.LeaveRoomHandler>(EventHandlers.LeaveRoomHandler, { useClass: EventHandlers.LeaveRoomHandler })
container.register<EventHandlers.AttackHandler>(EventHandlers.AttackHandler, { useClass: EventHandlers.AttackHandler })
container.register<EventHandlers.LootHandler>(EventHandlers.LootHandler, { useClass: EventHandlers.LootHandler })
container.register<EventHandlers.PickChestHandler>(EventHandlers.PickChestHandler, { useClass: EventHandlers.PickChestHandler })
container.register<EventHandlers.EndTurnHandler>(EventHandlers.EndTurnHandler, { useClass: EventHandlers.EndTurnHandler })
container.register<EventHandlers.NewGameHandler>(EventHandlers.NewGameHandler, { useClass: EventHandlers.NewGameHandler })

const subscriber = container.resolve(EventSubscriber)

io.on('connect', async socket => {
  const randomColor = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)
  const player = Player.fromSocket(socket, randomColor, 'barbarian')
  await players.add(player)

  logger.info('User connected', player)
  subscriber.subscribe(socket)

  socket.on('disconnecting', async () => {
    const lastSocketRooms = socket.rooms

    for (const lastSocketRoomId of lastSocketRooms) {
      const room = await rooms.find(lastSocketRoomId)

      if (!room) {
        continue
      }

      const socketIds = await server.fetchSocketIds(room)
      const roomsPlayers = (await (Promise.all(Array.from(socketIds).map(id => players.find(id)))))
        .filter(p => !!p)
        .map(p => p.getRoomPayload(p.id === room.createdById))

      server.emitInRoom('players', room, new PlayersEvent(roomsPlayers))
    }
  })

  socket.on('disconnect', async reason => {
    const createdRooms = await rooms.findByAuthorId(socket.id)

    createdRooms.forEach(createdRoom => {
      rooms.remove(createdRoom)
      server.emitInRoom('leftRoom', createdRoom, new LeftRoomEvent('room_deleted'))
      io.in(createdRoom.roomId).socketsLeave(createdRoom.roomId)
      logger.info('Room author disconnec, clean room', createdRoom.roomId)
    })

    await players.remove(player)
    logger.info('User disconnected', reason)
  })
})

httpServer.listen(8080, '0.0.0.0')
