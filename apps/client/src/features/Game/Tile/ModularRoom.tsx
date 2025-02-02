import React from 'react'
import * as THREE from 'three'
import { Instance, Instances, useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { VectorTuple } from 'services/socket'
import { Direction } from 'features/Game/Tile/type'

type GLTFResult = GLTF & {
  nodes: {
    floor_tile_large: THREE.Mesh
    wall_corner: THREE.Mesh
    wall_doorway: THREE.Mesh
    wall: THREE.Mesh
    torch_mounted001: THREE.Mesh
  }
  materials: {
    ['texture.006']: THREE.MeshStandardMaterial
    ['texture.010']: THREE.MeshStandardMaterial
    ['texture.009']: THREE.MeshStandardMaterial
    ['texture.013']: THREE.MeshStandardMaterial
    ['texture.011']: THREE.MeshStandardMaterial
  }
}

type Props = JSX.IntrinsicElements['group'] & {
  readonly directions: VectorTuple[]
}

const ModularRoom: React.FC<Props> = props => {
  const { nodes, materials } = useGLTF('/arts/dungeon/Tiles/modular_room.gltf') as unknown as GLTFResult

  const hasLeftDoorway = React.useMemo<boolean>(() => props.directions.includes(Direction.Left), [props.directions])
  const hasRightDoorway = React.useMemo<boolean>(() => props.directions.includes(Direction.Right), [props.directions])
  const hasUpDoorway = React.useMemo<boolean>(() => props.directions.includes(Direction.Up), [props.directions])
  const hasDownDoorway = React.useMemo<boolean>(() => props.directions.includes(Direction.Down), [props.directions])

  const doorwaysCount = React.useMemo(() => props.directions.length, [props.directions])
  const wallsCount = React.useMemo(() => 4 - props.directions.length, [props.directions])

  return (
    <group {...props} dispose={null}>
      <Instances count={4} geometry={nodes.floor_tile_large.geometry} material={materials['texture.006']}>
        <Instance position={[0, 0, 0]} castShadow receiveShadow />
        <Instance position={[0, 0, -4]} castShadow receiveShadow />
        <Instance position={[-4, 0, -4]} castShadow receiveShadow />
        <Instance position={[-4, 0, 0]} castShadow receiveShadow />
      </Instances>
      <Instances count={4} geometry={nodes.wall_corner.geometry} material={materials['texture.010']}>
        <Instance position={[0, 0, 0]} castShadow receiveShadow />
        <Instance position={[0, 0, 0]} rotation={[0, THREE.MathUtils.degToRad(180), 0]} castShadow receiveShadow />
        <Instance position={[0, 0, 0]} rotation={[0, THREE.MathUtils.degToRad(90), 0]} castShadow receiveShadow />
        <Instance position={[0, 0, 0]} rotation={[0, THREE.MathUtils.degToRad(-90), 0]} castShadow receiveShadow />
      </Instances>
      <Instances count={4} range={doorwaysCount} geometry={nodes.wall_doorway.geometry} material={materials['texture.009']}>
        {hasDownDoorway && <Instance position={[0, 0, 0]} castShadow receiveShadow />}
        {hasUpDoorway && <Instance position={[0, 0, 0]} rotation={[0, THREE.MathUtils.degToRad(180), 0]} castShadow receiveShadow />}
        {hasRightDoorway && <Instance position={[0, 0, 0]} rotation={[0, THREE.MathUtils.degToRad(90), 0]} castShadow receiveShadow />}
        {hasLeftDoorway && <Instance position={[0, 0, 0]} rotation={[0, THREE.MathUtils.degToRad(-90), 0]} castShadow receiveShadow />}
      </Instances>
      <Instances count={4} range={wallsCount} geometry={nodes.wall.geometry} material={materials['texture.013']}>
        {!hasDownDoorway && <Instance position={[0, 0, 0]} castShadow receiveShadow />}
        {!hasUpDoorway && <Instance position={[0, 0, 0]} rotation={[0, THREE.MathUtils.degToRad(180), 0]} castShadow receiveShadow />}
        {!hasRightDoorway && <Instance position={[0, 0, 0]} rotation={[0, THREE.MathUtils.degToRad(90), 0]} castShadow receiveShadow />}
        {!hasLeftDoorway && <Instance position={[0, 0, 0]} rotation={[0, THREE.MathUtils.degToRad(-90), 0]} castShadow receiveShadow />}
      </Instances>
      <Instances count={6} geometry={nodes.torch_mounted001.geometry} material={materials['texture.011']}>
        <Instance position={[0, 0, 0]} castShadow receiveShadow />
        <Instance position={[4, 0, 0]} castShadow receiveShadow />
        <Instance position={[0, 0, 0]} rotation={[0, THREE.MathUtils.degToRad(90), 0]} castShadow receiveShadow />
        <Instance position={[0, 0, -4]} rotation={[0, THREE.MathUtils.degToRad(90), 0]} castShadow receiveShadow />
        <Instance position={[0, 0, 0]} rotation={[0, THREE.MathUtils.degToRad(180), 0]} castShadow receiveShadow />
        <Instance position={[-4, 0, 0]} rotation={[0, THREE.MathUtils.degToRad(180), 0]} castShadow receiveShadow />
      </Instances>
    </group>
  )
}

useGLTF.preload('/arts/dungeon/Tiles/modular_room.gltf')

export default ModularRoom
