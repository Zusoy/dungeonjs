import React from 'react'
import { Scene } from 'features/Lobby/presentation/Scene'
import { TopControls } from 'features/Lobby/presentation/HUD/TopControls'

const Lobby: React.FC = () => {
  return (
    <div className='flex flex-col gap-8 h-screen justify-center items-center'>
      <Scene />
      <TopControls />
    </div>
  )
}

export default Lobby
