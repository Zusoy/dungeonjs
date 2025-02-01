import React from 'react'
import Start from 'features/Game/Map/Rooms/Start'
import HeroCharacter from 'features/Game/Character/Hero'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, Stats } from '@react-three/drei'
import { useSelector } from 'react-redux'
import { selectPlayers } from 'features/Game/slice'

const Game: React.FC = () => {
  const players = useSelector(selectPlayers)

  return (
    <Canvas style={{ backgroundColor: '#212129' }}>
      <Stats />
      <Start />
      <Environment preset='city' />
      <OrbitControls />
      {players.map(
        player =>
          <HeroCharacter
            key={player.id}
            hero={player.hero}
            username={player.username}
            color={player.color}
            position={player.position}
            rotation={player.rotation}
          />
      )}
    </Canvas>
  )
}

export default Game
