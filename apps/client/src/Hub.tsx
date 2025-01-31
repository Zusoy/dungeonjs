import React from 'react'
import ListRooms from 'features/Rooms/List'
import CreateRoom from 'features/Rooms/Create'
import Game from 'features/Game'
import { useSelector } from 'react-redux'
import { selectCurrentRoomId } from 'features/Rooms/slice'

const Hub: React.FC = () => {
  const roomId = useSelector(selectCurrentRoomId)
  const createRoomDialog = React.useRef<HTMLDialogElement>(null!)

  const openCreateRoomDialog = React.useCallback(() => {
    if (!createRoomDialog.current) {
      return
    }

    createRoomDialog.current.showModal()
  }, [createRoomDialog])

  if (roomId) {
    return (
      <Game />
    )
  }

  return (
    <div className='flex flex-col w-full min-h-screen items-center bg-base-100'>
      <div className='flex flex-row gap-2 items-center p-10'>
        <button type='button' className='btn btn-success btn-lg' onClick={openCreateRoomDialog}>New game</button>
      </div>
      <ListRooms />
      <CreateRoom ref={createRoomDialog} />
    </div>
  )
}

export default Hub
