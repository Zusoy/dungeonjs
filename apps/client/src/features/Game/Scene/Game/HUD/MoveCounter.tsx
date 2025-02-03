import React from 'react'
import { selectCurrentPlayer } from 'features/Game/slice'
import { useSelector } from 'react-redux'

const MoveCounter: React.FC = () => {
  const currentPlayer = useSelector(selectCurrentPlayer)

  return (
    <div className='bg-primary rounded-box text-neutral-content p-2 m-2'>
      <span className='countdown font-mono text-6xl'>
        <span style={{"--value": currentPlayer.movesCount}}></span>
      </span>
    </div>
  )
}

export default MoveCounter
