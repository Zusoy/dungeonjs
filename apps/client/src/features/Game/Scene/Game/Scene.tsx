import React from 'react'
import Tile from 'features/Game/Tile'
import HeroCharacter from 'features/Game/Character/Hero'
import { Canvas } from '@react-three/fiber'
import { CameraControls, Environment, Stats } from '@react-three/drei'
import { useSelector } from 'react-redux'
import { selectPlayers, selectTiles } from 'features/Game/slice'

const Scene: React.FC = () => {
  const camera = React.useRef<CameraControls>(null!)
  const players = useSelector(selectPlayers)
  const tiles = useSelector(selectTiles)

  return (
    <Canvas style={{ position: 'absolute', top: 0, zIndex: 99, backgroundColor: '#1D232A' }}>
      <Stats />
      <Environment preset='city' />
      <CameraControls maxDistance={30} minDistance={20} ref={camera} />
      {tiles.map(
        tile =>
          <Tile
            key={tile.id}
            type={tile.type}
            directions={tile.directions}
            position={[tile.coords[0] * 8, 0, tile.coords[1] * 8]}
          />
      )}
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
