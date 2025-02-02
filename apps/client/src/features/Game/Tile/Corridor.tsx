import React from 'react'
import * as THREE from 'three'
import { Instance, Instances, useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    floor_tile_large: THREE.Mesh
    wall: THREE.Mesh
    pillar: THREE.Mesh
  }
  materials: {
    texture: THREE.MeshStandardMaterial
    ['texture.001']: THREE.MeshStandardMaterial
    ['texture.002']: THREE.MeshStandardMaterial
  }
}

const Corridor: React.FC<JSX.IntrinsicElements['group']> = props => {
  const { nodes, materials } = useGLTF('/arts/dungeon/Corridors/01.gltf') as unknown as GLTFResult

  return (
    <group {...props} dispose={null}>
      <Instances count={2} geometry={nodes.floor_tile_large.geometry} material={materials.texture}>
        <Instance position={[0, 0, 0]} castShadow receiveShadow />
        <Instance position={[-4, 0, 0]} castShadow receiveShadow />
      </Instances>
      <Instances count={4} geometry={nodes.wall.geometry} material={materials['texture.001']}>
        <Instance position={[0, 0, 0]} castShadow receiveShadow />
        <Instance position={[-4, 0, 0]} castShadow receiveShadow />
        <Instance position={[0, 0, 4]} castShadow receiveShadow />
        <Instance position={[-4, 0, 4]} castShadow receiveShadow />
      </Instances>
      <Instances count={4} geometry={nodes.pillar.geometry} material={materials['texture.002']}>
        <Instance position={[0, 0, 0]} castShadow receiveShadow />
        <Instance position={[8, 0, 0]} castShadow receiveShadow />
        <Instance position={[0, 0, 4]} castShadow receiveShadow />
        <Instance position={[8, 0, 4]} castShadow receiveShadow />
      </Instances>
    </group>
  )
}

useGLTF.preload('/arts/dungeon/Corridors/01.gltf')

export default Corridor
