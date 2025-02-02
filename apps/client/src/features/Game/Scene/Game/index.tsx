import React from 'react'
import Scene from 'features/Game/Scene/Game/Scene'
import HUD from 'features/Game/Scene/Game/HUD'

const Game: React.FC = () =>
  <div className='flex flex-col gap-8 h-screen justify-center items-center'>
    <Scene />
    <div className='flex flex-col gap-4 items-center justify-center w-full z-[999]'>
      <HUD />
    </div>
  </div>

export default Game
