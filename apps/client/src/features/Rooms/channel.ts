import { AppSocket, SocketChannel } from 'services/socket'
import { joined, left, error, LeftRoomReason, RoomActions } from 'features/Rooms/slice'
import { eventChannel } from 'redux-saga'

const roomChannel: SocketChannel<RoomActions> = (socket: AppSocket) => {
  return eventChannel(emitter => {
    const joinedRoomListener = (room: string) => {
      emitter(joined(room))
    }

    const leftRoomListener = (reason: LeftRoomReason) => {
      emitter(left(reason))
    }

    const failedToJoinRoomListener = () => {
      emitter(error())
    }

    socket.on('joinedRoom', joinedRoomListener)
    socket.on('leftRoom', leftRoomListener)
    socket.on('failedToJoinRoom', failedToJoinRoomListener)

    return () => {
      socket.off('joinedRoom', joinedRoomListener)
      socket.off('leftRoom', leftRoomListener)
      socket.off('failedToJoinRoom', failedToJoinRoomListener)
    }
  })
}

export default roomChannel
