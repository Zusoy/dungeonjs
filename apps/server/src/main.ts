import container from 'container'
import { createServer } from 'http'
import { Server as IOServer } from 'socket.io'
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

const httpServer = createServer((_, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Request-Method', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.writeHead(200)
  res.end()
})

const io = new IOServer<ClientToServer, ServerToClients, InterServer>(httpServer)
const players = container.resolve<IPlayers>('players')
const rooms = container.resolve<IRooms>('rooms')
const logger = container.resolve<ILogger>('logger')

const server = new InputOutputServer(io)
container.register<IServer>('server', { useValue: server })
container.register<IPlayerBroadcaster>('players.broadcaster', { useClass: PlayerBroadcaster })
container.register<ITurnAllocator>('turn_allocator', { useClass: TurnAllocator })

container.register<EventHandlers.ChangeHeroHandler>(EventHandlers.ChangeHeroHandler, { useClass: EventHandlers.ChangeHeroHandler })
container.register<EventHandlers.MoveHandler>(EventHandlers.MoveHandler, { useClass: EventHandlers.MoveHandler })
container.register<EventHandlers.StartGameHandler>(EventHandlers.StartGameHandler, { useClass: EventHandlers.StartGameHandler })
container.register<EventHandlers.CreateRoomHandler>(EventHandlers.CreateRoomHandler, { useClass: EventHandlers.CreateRoomHandler })
container.register<EventHandlers.JoinRoomHandler>(EventHandlers.JoinRoomHandler, { useClass: EventHandlers.JoinRoomHandler })
container.register<EventHandlers.LeaveRoomHandler>(EventHandlers.LeaveRoomHandler, { useClass: EventHandlers.LeaveRoomHandler })
container.register<EventHandlers.AttackHandler>(EventHandlers.AttackHandler, { useClass: EventHandlers.AttackHandler })
container.register<EventHandlers.LootHandler>(EventHandlers.LootHandler, { useClass: EventHandlers.LootHandler })
container.register<EventHandlers.PickChestHandler>(EventHandlers.PickChestHandler, { useClass: EventHandlers.PickChestHandler })

const subscriber = container.resolve(EventSubscriber)

io.on('connect', socket => {
  const randomColor = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)
  const player = Player.fromSocket(socket, randomColor, 'barbarian')
  players.add(player)

  logger.info('User connected', player)
  subscriber.subscribe(socket)

  socket.on('disconnecting', async () => {
    const lastSocketRooms = socket.rooms
    const currentRooms = Array.from(rooms)

    for (const lastSocketRoomId of lastSocketRooms) {
      const room = currentRooms.find(({ roomId }) => roomId === lastSocketRoomId)

      if (!room) {
        continue
      }

      const socketIds = await server.fetchSocketIds(room)

      const roomsPlayers = Array.from(socketIds)
        .map(id => Array.from(players).find(p => p.id === id) || null)
        .filter(p => !!p)
        .map(p => p.getRoomPayload(p.id === room.createdById))

      server.emitInRoom('players', room, { players: roomsPlayers })
    }
  })

  socket.on('disconnect', reason => {
    const createdRooms = Array.from(rooms).filter(({ createdById }) => createdById === socket.id)

    createdRooms.forEach(createdRoom => {
      rooms.remove(createdRoom)
      server.emitInRoom('leftRoom', createdRoom, { reason: 'room_deleted' })
      io.in(createdRoom.roomId).socketsLeave(createdRoom.roomId)
      logger.info('Room author disconnec, clean room', createdRoom.roomId)
    })

    players.remove(player)
    logger.info('User disconnected', reason)
  })
})

httpServer.listen(8080, '0.0.0.0')
