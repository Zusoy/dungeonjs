import React from 'react'
import { CgSandClock } from 'react-icons/cg'
import { useDispatch } from 'react-redux'
import { endTurn } from 'features/Game/application/slice'

export const EndTurnButton: React.FC = () => {
  const dispatch = useDispatch()

  return (
    <button
      className='btn btn-primary rounded-b-full h-20 border-transparent bg-gradient-to-b from-amber-100 to-amber-500 hover:border-transparent'
      onClick={() => dispatch(endTurn({ timestamp: Date.now() }))}
    >
      <CgSandClock className='w-8 h-8' />
    </button>
  )
}
