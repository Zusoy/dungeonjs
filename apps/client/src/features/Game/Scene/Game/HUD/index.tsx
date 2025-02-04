import React from 'react'
import MoveCounter from 'features/Game/Scene/Game/HUD/MoveCounter'
import Players from 'features/Game/Scene/Game/HUD/Players'

const HUD: React.FC = () => {
  return (
    <div className='absolute top-0 flex'>
      <div className='flex flex-row items-center gap-2'>
        <MoveCounter />
        <Players />
      </div>
    </div>
  )
}

export default HUD
