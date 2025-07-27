import React from 'react'
import Tile from 'features/Game/Dungeon/presentation/GameObject/Tile'
import HeroCharacter from 'features/Game/Dungeon/presentation/GameObject/Character/Hero'
import SkeletonCharacter from 'features/Game/Dungeon/presentation/GameObject/Character/Skeleton'
import { Direction } from 'features/Game/Dungeon/presentation/Controller/Direction'
import { Loots } from 'features/Game/Dungeon/presentation/Instance/Loots'
import { Camera, type GameCamera } from 'features/Game/Dungeon/presentation/Controller/Camera'
import { Canvas } from '@react-three/fiber'
import { Vector3 } from 'three'
import { Environment, Grid } from '@react-three/drei'
import { useSelector } from 'react-redux'
import {
  selectCurrentPlayerTurn,
  selectEnemies,
  selectFocusedCoords,
  selectTiles
} from 'features/Game/Dungeon/application/slice'
import { selectPlayers } from 'features/Lobby/application/slice'

export const Scene: React.FC = () => {
  const camera = React.useRef<GameCamera>(null!)
  const players = useSelector(selectPlayers)
  const tiles = useSelector(selectTiles)
  const enemies = useSelector(selectEnemies)
  const focusedCoords = useSelector(selectFocusedCoords)
  const currentPlayerTurn = useSelector(selectCurrentPlayerTurn)

  React.useEffect(() => {
    if (!focusedCoords) {
      return
    }

    camera.current.focus(focusedCoords)
  }, [focusedCoords, camera])

  React.useEffect(() => {
    if (!currentPlayerTurn || !camera.current) {
      return
    }

    camera.current.focus(currentPlayerTurn.coords)
  }, [camera, currentPlayerTurn])

  return (
    <Canvas style={{ position: 'absolute', top: 0, zIndex: 99, backgroundColor: '#1D232A' }}>
      <Grid
        infiniteGrid
        cellSize={8}
        sectionSize={4}
        cellColor={'white'}
        sectionColor={'white'}
      />
      <Environment preset='city' />
      <Camera ref={camera} />
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
            health={player.health}
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
      <Direction />
      <Loots />
    </Canvas>
  )
}

