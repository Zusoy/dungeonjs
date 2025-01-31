import React from 'react'
import Start from 'features/Game/Map/Rooms/Start'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, Stats } from '@react-three/drei'

const Game: React.FC = () => {
  return (
    <Canvas style={{ backgroundColor: '#212129' }}>
      <Stats />
      <Start />
      <Environment preset='city' />
      <OrbitControls />
    </Canvas>
  )
}

export default Game
