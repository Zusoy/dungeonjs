import React from 'react'
import * as THREE from 'three'
import { Instance, Instances, useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { VectorTuple } from 'services/socket'

type GLTFResult = GLTF & {
  nodes: {
    floor_tile_large: THREE.Mesh
    chair001: THREE.Mesh
    table_long_tablecloth: THREE.Mesh
    wall: THREE.Mesh
    banner_patternA_blue: THREE.Mesh
    banner_patternA_green: THREE.Mesh
    banner_patternA_blue001: THREE.Mesh
    coin_stack_small: THREE.Mesh
    bottle_B_green: THREE.Mesh
  }
  materials: {
    texture: THREE.MeshStandardMaterial
    ['texture.002']: THREE.MeshStandardMaterial
    ['texture.008']: THREE.MeshStandardMaterial
    ['texture.009']: THREE.MeshStandardMaterial
    ['texture.012']: THREE.MeshStandardMaterial
    ['texture.013']: THREE.MeshStandardMaterial
    ['texture.014']: THREE.MeshStandardMaterial
    ['texture.015']: THREE.MeshStandardMaterial
  }
}

const LobbyRoom: React.FC<JSX.IntrinsicElements['group']> = props => {
  const { nodes, materials } = useGLTF('/arts/dungeon/lobby.gltf') as unknown as GLTFResult

  const rotation = React.useMemo<VectorTuple>(
    () => [0, THREE.MathUtils.degToRad(180), 0],
    []
  )

  return (
    <group {...props} dispose={null} rotation={rotation}>
      <Instances limit={10} geometry={nodes.floor_tile_large.geometry} material={materials.texture}>
        <Instance position={[-4, 0, 0]} castShadow receiveShadow />
        <Instance position={[0, 0, 0]} castShadow receiveShadow />
        <Instance position={[0, 0, 0]} castShadow receiveShadow />
        <Instance position={[4, 0, 0]} castShadow receiveShadow />
        <Instance position={[8, 0, 0]} castShadow receiveShadow />
        <Instance position={[-4, 0, 4]} castShadow receiveShadow />
        <Instance position={[0, 0, 4]} castShadow receiveShadow />
        <Instance position={[0, 0, 4]} castShadow receiveShadow />
        <Instance position={[4, 0, 4]} castShadow receiveShadow />
        <Instance position={[8, 0, 4]} castShadow receiveShadow />
      </Instances>
      <Instances limit={4} geometry={nodes.chair001.geometry} material={materials['texture.002']}>
        <Instance position={[0, 0, 0]} castShadow receiveShadow />
        <Instance position={[1, 0, 0]} castShadow receiveShadow />
        <Instance position={[2, 0, 0]} castShadow receiveShadow />
        <Instance position={[3, 0, 0]} castShadow receiveShadow />
      </Instances>
      <Instances limit={4} geometry={nodes.wall.geometry} material={materials['texture.009']}>
        <Instance position={[-4, 0, 0]} castShadow receiveShadow />
        <Instance position={[0, 0, 0]} castShadow receiveShadow />
        <Instance position={[4, 0, 0]} castShadow receiveShadow />
        <Instance position={[8, 0, 0]} castShadow receiveShadow />
      </Instances>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.banner_patternA_blue.geometry}
        material={materials['texture.012']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.banner_patternA_green.geometry}
        material={materials['texture.013']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.banner_patternA_blue001.geometry}
        material={materials['texture.012']}
      />
    </group>
  )
}

useGLTF.preload('/arts/dungeon/lobby.gltf')

export default LobbyRoom
