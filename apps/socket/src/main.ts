import { createServer } from 'http'
import { Server } from 'socket.io'
import type { ClientToServer, ServerToClients, InterServer } from 'Netcode/events'
import UserCollection from 'Netcode/Collection/UserCollection'
import RoomCollection from 'Netcode/Collection/RoomCollection'
import EventSubscriber from 'EventSubscriber'
import User from 'Netcode/User'
import CreateRoomHandler from 'EventHandler/Room/CreateRoomHandler'
import JoinRoomHandler from 'EventHandler/Room/JoinRoomHandler'
import LeaveRoomHandler from 'EventHandler/Room/LeaveRoomHandler'
import ChangeHeroHandler from 'EventHandler/Game/ChangeHeroHandler'
import StartGameHandler from 'EventHandler/Game/StartGameHandler'
import MoveToCoordsHandler from 'EventHandler/Game/MoveToCoordsHandler'

const httpServer = createServer((_, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Request-Method', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.writeHead(200)
  res.end()
})

const io = new Server<ClientToServer, ServerToClients, InterServer>(httpServer)
const users = new UserCollection()
const rooms = new RoomCollection()
const subscriber = new EventSubscriber([
  new CreateRoomHandler(io, users, rooms),
  new JoinRoomHandler(io, users, rooms),
  new LeaveRoomHandler(io, users, rooms),
  new ChangeHeroHandler(io, users, rooms),
  new StartGameHandler(io, users, rooms),
  new MoveToCoordsHandler(io, users, rooms)
])

io.on('connect', socket => {
  const randomColor = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)
  const user = User.fromSocket(socket, randomColor, 'barbarian')
  users.add(user)

  socket.emit('availableRooms', Array.from(rooms).map(({ roomId }) => roomId))
  console.log('User connected', user)
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
      console.log('Room author disconnec, clean room', createdRoom.roomId)
    })

    io.emit('availableRooms', Array.from(rooms).map(({ roomId }) => roomId))
    users.remove(user)

    console.log('User disconnected', reason)
  })
})

httpServer.listen(8080, '0.0.0.0')
