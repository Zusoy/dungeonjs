import { AppSocket, LeftRoomReason, SocketChannel } from 'services/socket'
import { joined, left, received, RoomActions } from 'features/Rooms/slice'
import { eventChannel } from 'redux-saga'

const roomChannel: SocketChannel<RoomActions> = (socket: AppSocket) => {
  return eventChannel(emitter => {
    const availableRoomsListener = (rooms: Iterable<string>) => {
      emitter(received(Array.from(rooms)))
    }

    const joinedRoomListener = (room: string) => {
      emitter(joined(room))
    }

    const leftRoomListener = (reason: LeftRoomReason) => {
      emitter(left(reason))
    }

    socket.on('availableRooms', availableRoomsListener)
    socket.on('joinedRoom', joinedRoomListener)
    socket.on('leftRoom', leftRoomListener)

    return () => {
      socket.off('availableRooms', availableRoomsListener)
      socket.off('joinedRoom', joinedRoomListener)
      socket.off('leftRoom', leftRoomListener)
    }
  })
}

export default roomChannel
