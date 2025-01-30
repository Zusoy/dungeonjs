import React from 'react'
import { selectRooms, join } from 'features/Rooms/slice'
import { useDispatch, useSelector } from 'react-redux'

const List: React.FC = () => {
  const dispatch = useDispatch()
  const rooms = useSelector(selectRooms)

  return (
    <div className='flex flex-col gap-2'>
      {rooms.map(
        roomId =>
          <div className='flex flex-row gap-2 p-4 rounded-md bg-slate-950'>
            <span className='font-bold text-lg'>{roomId}</span>
            <button
              type='button'
              className='btn btn-primary btn-outline btn-sm'
              onClick={() => dispatch(join({ roomId}))}
            >
              Join
            </button>
          </div>
      )}
    </div>
  )
}

export default List
