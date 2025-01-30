import React from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { VectorTuple } from 'services/socket'

type GLTFResult = GLTF & {
  nodes: {
    floor_tile_large: THREE.Mesh
    floor_tile_large001: THREE.Mesh
    floor_tile_large002: THREE.Mesh
    floor_tile_large003: THREE.Mesh
    chair001: THREE.Mesh
    chair002: THREE.Mesh
    chair003: THREE.Mesh
    chair004: THREE.Mesh
    table_long_tablecloth: THREE.Mesh
    wall: THREE.Mesh
    wall001: THREE.Mesh
    floor_tile_large004: THREE.Mesh
    floor_tile_large005: THREE.Mesh
    floor_tile_large006: THREE.Mesh
    wall002: THREE.Mesh
    wall003: THREE.Mesh
    floor_tile_large007: THREE.Mesh
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
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.floor_tile_large.geometry}
        material={materials.texture}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.floor_tile_large001.geometry}
        material={materials.texture}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.floor_tile_large002.geometry}
        material={materials.texture}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.floor_tile_large003.geometry}
        material={materials.texture}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.chair001.geometry}
        material={materials['texture.002']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.chair002.geometry}
        material={materials['texture.002']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.chair003.geometry}
        material={materials['texture.002']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.chair004.geometry}
        material={materials['texture.002']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.table_long_tablecloth.geometry}
        material={materials['texture.008']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall.geometry}
        material={materials['texture.009']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall001.geometry}
        material={materials['texture.009']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.floor_tile_large004.geometry}
        material={materials.texture}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.floor_tile_large005.geometry}
        material={materials.texture}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.floor_tile_large006.geometry}
        material={materials.texture}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall002.geometry}
        material={materials['texture.009']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall003.geometry}
        material={materials['texture.009']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.floor_tile_large007.geometry}
        material={materials.texture}
      />
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
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.coin_stack_small.geometry}
        material={materials['texture.014']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.bottle_B_green.geometry}
        material={materials['texture.015']}
      />
    </group>
  )
}

useGLTF.preload('/arts/dungeon/lobby.gltf')

export default LobbyRoom
