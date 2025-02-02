import React from 'react'
import StartTile from 'features/Game/Tile/Room/Start'
import HeroCharacter from 'features/Game/Character/Hero'
import { Canvas } from '@react-three/fiber'
import { CameraControls, Environment, Stats } from '@react-three/drei'
import { useSelector } from 'react-redux'
import { selectPlayers } from 'features/Game/slice'

const Scene: React.FC = () => {
  const camera = React.useRef<CameraControls>(null!)
  const players = useSelector(selectPlayers)

  return (
    <Canvas style={{ position: 'absolute', top: 0, zIndex: 99, backgroundColor: '#1D232A' }}>
      <Stats />
      <StartTile position={[0, 0, 0]} rotation={[0, 0, 0]} />
      <Environment preset='city' />
      <CameraControls maxDistance={30} minDistance={20} ref={camera} />
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

export default Scene
