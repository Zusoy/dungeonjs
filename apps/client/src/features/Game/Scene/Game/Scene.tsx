import React from 'react'
import Tile from 'features/Game/Tile'
import HeroCharacter from 'features/Game/Character/Hero'
import SkeletonCharacter from 'features/Game/Character/Skeleton'
import MoveControls from 'features/Game/Scene/Game/MoveControls'
import { Canvas } from '@react-three/fiber'
import { Vector3 } from 'three'
import { CameraControls, Environment, Stats } from '@react-three/drei'
import { useSelector } from 'react-redux'
import { selectChests, selectEnemies, selectPlayers, selectTiles } from 'features/Game/slice'
import { Chest, Instances as Chests } from 'features/Game/Prop/Chest'

const Scene: React.FC = () => {
  const camera = React.useRef<CameraControls>(null!)
  const players = useSelector(selectPlayers)
  const tiles = useSelector(selectTiles)
  const enemies = useSelector(selectEnemies)
  const chests = useSelector(selectChests)

  return (
    <Canvas style={{ position: 'absolute', top: 0, zIndex: 99, backgroundColor: '#1D232A' }}>
      <Stats />
      <Environment preset='city' />
      <CameraControls maxDistance={30} minDistance={20} ref={camera} makeDefault />
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
            position={new Vector3(player.position[0], player.position[1], player.position[2])}
            rotation={player.rotation}
          />
      )}
      {enemies.map(
        enemy =>
          <SkeletonCharacter
            key={`enemy_${enemy.type}_${enemy.coords[0]}${enemy.coords[1]}`}
            type={enemy.type}
            position={new Vector3(enemy.coords[0] * 8, 0, enemy.coords[1] * 8)}
          />
      )}
      <Chests>
        {chests.map(
          chest =>
            <Chest
              key={chest.id}
              position={[chest.coords[0] * 8, 0, chest.coords[1] * 8]}
            />
        )}
      </Chests>
      <MoveControls />
    </Canvas>
  )
}

export default Scene
