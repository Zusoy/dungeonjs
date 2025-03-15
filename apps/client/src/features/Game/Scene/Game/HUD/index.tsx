import React from 'react'
import MoveCounter from 'features/Game/Scene/Game/HUD/MoveCounter'
import Players from 'features/Game/Scene/Game/HUD/Players'
import Inventory from 'features/Game/Scene/Game/HUD/Inventory'
import Fullscreen from 'features/Game/Scene/Game/HUD/Fullscreen'

const HUD: React.FC = () => {
  return (
    <>
      <div className='absolute top-0 flex w-screen justify-center'>
        <div className='flex flex-row items-center gap-2'>
          <Inventory />
          <MoveCounter />
          <Fullscreen />
        </div>
      </div>
      <Players />
    </>
  )
}

export default HUD
