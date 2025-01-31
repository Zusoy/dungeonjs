import React from 'react'
import LobbyRoom from 'features/Game/Scene/Lobby/LobbyRoom'
import HeroCharacter from 'features/Game/Character/Hero'
import { Canvas } from '@react-three/fiber'
import { Environment, Stats } from '@react-three/drei'
import { useSelector } from 'react-redux'
import { selectPlayers } from 'features/Game/slice'
import { MathUtils } from 'three'

const Scene: React.FC = () => {
  const players = useSelector(selectPlayers)

  return (
    <Canvas
      style={{ position: 'absolute', top: 0, zIndex: 99, backgroundColor: '#1D232A' }}
      camera={{ position: [-1.8, 2, 1], fov: 80, rotation: [MathUtils.degToRad(-15), MathUtils.degToRad(0), 0] }}
    >
      <Stats />
      <LobbyRoom position={[0, 0, 0]} />
      <Environment preset='city' />
      {players.map(
        (player, i) =>
          <HeroCharacter
            key={player.id}
            hero={player.hero}
            username={player.username}
            color={player.color}
            position={[i * -2, 0, -3]}
          />
      )}
    </Canvas>
  )
}

export default Scene
