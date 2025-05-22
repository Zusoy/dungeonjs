import React from 'react'
import CreateRoom from 'features/Rooms/Create'
import JoinRoom from 'features/Rooms/Join'
import Tutorial from 'Tutorial'
import FullPageLoader from 'widgets/Loader/FullPageLoader'
import Fullscreen from 'features/Game/Scene/Game/HUD/Fullscreen'
import { useSelector } from 'react-redux'
import { selectCurrentRoomId } from 'features/Rooms/slice'
import { FaPlusSquare } from 'react-icons/fa'
import { FaUsers } from 'react-icons/fa6'
import { motion } from 'motion/react'

const Game = React.lazy(() => import('features/Game'))

const Hub: React.FC = () => {
  const roomId = useSelector(selectCurrentRoomId)
  const createRoomDialog = React.useRef<HTMLDialogElement>(null!)
  const joinRoomDialog = React.useRef<HTMLDialogElement>(null!)

  const openCreateRoomDialog = React.useCallback(() => {
    if (!createRoomDialog.current) {
      return
    }

    createRoomDialog.current.showModal()
  }, [createRoomDialog])

  const openJoinRoomDialog = React.useCallback(() => {
    if (!joinRoomDialog.current) {
      return
    }

    joinRoomDialog.current.showModal()
  }, [joinRoomDialog])

  if (roomId) {
    return (
      <React.Suspense fallback={<FullPageLoader />}>
        <Game />
      </React.Suspense>
    )
  }

  return (
    <>
      <div className='navbar bg-neutral shadow-sm'>
        <div className='flex-1'>
          <a className='btn btn-ghost text-xl'>Dungeon'JS <p className='text-sm text-info'>v0.0.1</p></a>
          <Fullscreen />
        </div>
        <div className='flex gap-2'>
          <button type='button' className='btn btn-success btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl' onClick={openCreateRoomDialog}>
            <FaPlusSquare />
            New Game
          </button>
          <button type='button' className='btn btn-info btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl' onClick={openJoinRoomDialog}>
            <FaUsers />
            Join Game
          </button>
        </div>
      </div>
      <div className='hero h-72 bg-base-200'>
        <div className='hero-content text-center'>
          <motion.div
            className='max-w-md'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className='text-4xl font-bold'>Hello adventurer !</h1>
            <p className='py-3 text-lg'>
              Dive into a thrilling multiplayer dungeon crawler! Discover rooms, defeat
              enemies, and collect treasures to become the ultimate adventurer.
            </p>
          </motion.div>
        </div>
      </div>
      <div className='flex flex-col w-full items-center bg-base-100'>
        <Tutorial />
      </div>
      <CreateRoom ref={createRoomDialog} />
      <JoinRoom ref={joinRoomDialog} />
    </>
  )
}

export default Hub
