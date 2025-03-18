import container from 'container'
import { createServer } from 'http'
import { Server } from 'socket.io'
import type { ClientToServer, ServerToClients, InterServer } from 'Netcode/events'
import EventSubscriber from 'EventSubscriber'
import User from 'Netcode/User'
import ICollection from 'Netcode/Collection/ICollection'
import Room from 'Netcode/Room'
import { AppServer } from 'types/socket'
import ChangeHeroHandler from 'EventHandler/Game/ChangeHeroHandler'
import MoveToCoordsHandler from 'EventHandler/Game/MoveToCoordsHandler'
import StartGameHandler from 'EventHandler/Game/StartGameHandler'
import CreateRoomHandler from 'EventHandler/Room/CreateRoomHandler'
import JoinRoomHandler from 'EventHandler/Room/JoinRoomHandler'
import LeaveRoomHandler from 'EventHandler/Room/LeaveRoomHandler'
import ILogger from 'ILogger'

const httpServer = createServer((_, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Request-Method', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.writeHead(200)
  res.end()
})

const io = new Server<ClientToServer, ServerToClients, InterServer>(httpServer)
container.register<AppServer>('server', { useValue: io })

container.register<ChangeHeroHandler>(ChangeHeroHandler, { useClass: ChangeHeroHandler })
container.register<MoveToCoordsHandler>(MoveToCoordsHandler, { useClass: MoveToCoordsHandler })
container.register<StartGameHandler>(StartGameHandler, { useClass: StartGameHandler })
container.register<CreateRoomHandler>(CreateRoomHandler, { useClass: CreateRoomHandler })
container.register<JoinRoomHandler>(JoinRoomHandler, { useClass: JoinRoomHandler })
container.register<LeaveRoomHandler>(LeaveRoomHandler, { useClass: LeaveRoomHandler })

const subscriber = container.resolve(EventSubscriber)
const users = container.resolve<ICollection<User>>('users')
const rooms = container.resolve<ICollection<Room>>('rooms')
const logger = container.resolve<ILogger>('logger')

io.on('connect', socket => {
  const randomColor = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)
  const user = User.fromSocket(socket, randomColor, 'barbarian')
  users.add(user)

  socket.emit('availableRooms', Array.from(rooms).map(({ roomId }) => roomId))
  logger.info('User connected', user)
  subscriber.subscribe(socket)

  socket.on('disconnecting', async () => {
    const lastSocketRooms = socket.rooms
    const currentRooms = Array.from(rooms)

    for (const lastSocketRoomId of lastSocketRooms) {
      const room = currentRooms.find(({ roomId }) => roomId === lastSocketRoomId)

      if (!room) {
        continue
      }

      const sockets = await io.in(lastSocketRoomId).fetchSockets()
      const roomsUsers = sockets
        .map(({ id }) => id)
        .map(id => Array.from(users).find(user => user.id === id) || null)
        .filter(u => !!u)
        .map(u => u.getRoomPayload(u.id === room.createdById))

      io.in(lastSocketRoomId).emit('players', roomsUsers)
    }
  })

  socket.on('disconnect', reason => {
    const createdRooms = Array.from(rooms).filter(({ createdById }) => createdById === socket.id)

    createdRooms.forEach(createdRoom => {
      rooms.remove(createdRoom)
      io.in(createdRoom.roomId).emit('leftRoom', 'room_deleted')
      io.in(createdRoom.roomId).socketsLeave(createdRoom.roomId)
      logger.info('Room author disconnec, clean room', createdRoom.roomId)
    })

    io.emit('availableRooms', Array.from(rooms).map(({ roomId }) => roomId))
    users.remove(user)
    logger.info('User disconnected', reason)
  })
})

httpServer.listen(8080, '0.0.0.0')
