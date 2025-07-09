import type { SocketChannel } from 'services/socket'
import { AppSocket } from 'services/socket'
import { eventChannel } from 'redux-saga'
import { joined, left, error, RoomActions, JoinedRoomPayload, LeftRoomPayload, FailedToJoinRoomPayload } from 'features/Rooms/application/slice'

const roomChannel: SocketChannel<RoomActions> = (socket: AppSocket) => {
  return eventChannel(emitter => {
    const joinedRoomListener = (payload: JoinedRoomPayload) => {
      emitter(joined(payload))
    }

    const leftRoomListener = (payload: LeftRoomPayload) => {
      emitter(left(payload))
    }

    const failedToJoinRoomListener = (payload: FailedToJoinRoomPayload) => {
      emitter(error(payload))
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
