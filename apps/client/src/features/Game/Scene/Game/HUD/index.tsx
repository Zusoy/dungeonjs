import React from 'react'
import MoveCounter from 'features/Game/Scene/Game/HUD/MoveCounter'
import { useSelector } from 'react-redux'
import { selectIsPlayerTurn } from 'features/Game/slice'

const HUD: React.FC = () => {
  const isPlayerTurn = useSelector(selectIsPlayerTurn)

  if (!isPlayerTurn) {
    return null
  }

  return (
    <div className='absolute top-0 flex'>
      <div className='flex flex-row items-center'>
        <MoveCounter />
      </div>
    </div>
  )
}

export default HUD
