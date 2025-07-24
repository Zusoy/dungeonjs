import React from 'react'
import { GameHUD } from 'features/Game/Dungeon/presentation/HUD'
import { Scene } from 'features/Game/Dungeon/presentation/Scene'

const Game: React.FC = () => (
  <div className='flex flex-col gap-8 h-screen justify-center items-center'>
    <Scene />
    <div className='flex flex-col gap-4 items-center justify-center w-full z-[999]'>
      <GameHUD />
    </div>
  </div>
)

export default Game
