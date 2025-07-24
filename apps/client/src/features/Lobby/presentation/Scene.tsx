import React from 'react'
import HeroCharacter from 'features/Game/Dungeon/presentation/GameObject/Character/Hero'
import { LobbySpace } from 'features/Lobby/presentation/GameObject/LobbySpace'
import { selectPlayers } from 'features/Lobby/application/slice'
import { Canvas } from '@react-three/fiber'
import { Environment, Stats } from '@react-three/drei'
import { useSelector } from 'react-redux'
import { MathUtils, Vector3 } from 'three'

export const Scene: React.FC = () => {
  const players = useSelector(selectPlayers)

  return (
    <Canvas
      style={{ position: 'absolute', top: 0, zIndex: 99, backgroundColor: '#1D232A' }}
      camera={{ position: [-1.8, 2, 1], fov: 80, rotation: [MathUtils.degToRad(-15), MathUtils.degToRad(0), 0] }}
    >
      <Stats />
      <LobbySpace position={[0, 0, 0]} />
      <Environment preset='city' />
      {players.map(
        (player, i) =>
          <HeroCharacter
            key={player.id}
            hero={player.hero}
            username={player.username}
            color={player.color}
            position={new Vector3(i * -2, 0, -3)}
            health={player.health}
          />
      )}
    </Canvas>
  )
}
