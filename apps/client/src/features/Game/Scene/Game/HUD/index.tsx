import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsPlayerTurn } from 'features/Game/slice'

const HUD: React.FC = () => {
  const isPlayerTurn = useSelector(selectIsPlayerTurn)

  if (!isPlayerTurn) {
    return null
  }

  return (
    <div className='absolute top-0 flex'>
      <div className='flex flex-row'>
        <button type='button' className='btn btn-primary'>Test</button>
      </div>
    </div>
  )
}

export default HUD
