import React from 'react'
import ListRooms from 'features/Rooms/List'
import CreateRoom from 'features/Rooms/Create'
import Game from 'features/Game'
import { useSelector } from 'react-redux'
import { selectCurrentRoomId } from 'features/Rooms/slice'
import { FaPlusSquare } from 'react-icons/fa'

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
    <>
      <div className='navbar bg-neutral shadow-sm'>
        <div className='flex-1'>
          <a className='btn btn-ghost text-xl'>Dungeon'JS <p className='text-sm text-info'>v0.0.1</p></a>
        </div>
        <div className='flex-none'>
          <button type='button' className='btn btn-success' onClick={openCreateRoomDialog}>
            <FaPlusSquare />
            New Game
          </button>
        </div>
      </div>
      <div className='hero h-72 bg-base-200'>
        <div className='hero-content text-center'>
          <div className='max-w-md'>
            <h1 className='text-5xl font-bold'>Hello adventurer !</h1>
            <p className='py-6'>
              Are you ready to step into the mysterious depths of Dungeon'JS?
            </p>
          </div>
        </div>
      </div>
      <div className='flex flex-col w-full items-center bg-base-100'>
        <ListRooms />
      </div>
      <CreateRoom ref={createRoomDialog} />
    </>
  )
}

export default Hub
