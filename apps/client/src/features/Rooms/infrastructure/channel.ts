import type { SocketChannel } from 'services/socket'
import { AppSocket } from 'services/socket'
import { toast, ToastType } from 'services/toaster'
import { eventChannel } from 'redux-saga'
import { joined, left, error, RoomActions, JoinedRoomPayload, LeftRoomPayload, FailedToJoinRoomPayload } from 'features/Rooms/application/slice'

const roomChannel: SocketChannel<RoomActions> = (socket: AppSocket) => {
  return eventChannel(emitter => {
    const joinedRoomListener = (payload: JoinedRoomPayload) => {
      toast({ content: 'Game Room', description: 'Room joined successfully', type: ToastType.Success })
      emitter(joined(payload))
    }

    const leftRoomListener = (payload: LeftRoomPayload) => {
      toast({ content: 'Game Room', description: 'Room left successfully', type: ToastType.Success })
      emitter(left(payload))
    }

    const failedToJoinRoomListener = (payload: FailedToJoinRoomPayload) => {
      toast({ content: 'Game Room', description: 'Failed to join the room, please try again.', type: ToastType.Error })
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
