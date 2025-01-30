import { Canvas } from '@react-three/fiber'
import React from 'react'

const Game: React.FC = () => {
  return (
    <Canvas style={{ backgroundColor: '#212129' }}>
      <mesh></mesh>
    </Canvas>
  )
}

export default Game
