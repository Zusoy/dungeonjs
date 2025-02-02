import React from 'react'
import * as THREE from 'three'
import { Instance, Instances, useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    floor_tile_large: THREE.Mesh
    wall_corner: THREE.Mesh
    wall_doorway: THREE.Mesh
    torch_mounted001: THREE.Mesh
    barrel_large_decorated: THREE.Mesh
  }
  materials: {
    ['texture.006']: THREE.MeshStandardMaterial
    ['texture.010']: THREE.MeshStandardMaterial
    ['texture.009']: THREE.MeshStandardMaterial
    ['texture.011']: THREE.MeshStandardMaterial
    ['texture.012']: THREE.MeshStandardMaterial
  }
}

const Start: React.FC<JSX.IntrinsicElements['group']> = props => {
  const { nodes, materials } = useGLTF('/arts/dungeon/Rooms/start.gltf') as unknown as GLTFResult

  return (
    <group {...props} dispose={null}>
      <Instances limit={4} geometry={nodes.floor_tile_large.geometry} material={materials['texture.006']}>
        <Instance position={[0, 0, 0]} castShadow receiveShadow />
        <Instance position={[0, 0, -4]} castShadow receiveShadow />
        <Instance position={[-4, 0, -4]} castShadow receiveShadow />
        <Instance position={[-4, 0, 0]} castShadow receiveShadow />
      </Instances>
      <Instances limit={4} geometry={nodes.wall_corner.geometry} material={materials['texture.010']}>
        <Instance position={[0, 0, 0]} castShadow receiveShadow />
        <Instance position={[0, 0, 0]} rotation={[0, THREE.MathUtils.degToRad(180), 0]} castShadow receiveShadow />
        <Instance position={[0, 0, 0]} rotation={[0, THREE.MathUtils.degToRad(90), 0]} castShadow receiveShadow />
        <Instance position={[0, 0, 0]} rotation={[0, THREE.MathUtils.degToRad(-90), 0]} castShadow receiveShadow />
      </Instances>
      <Instances limit={4} geometry={nodes.wall_doorway.geometry} material={materials['texture.009']}>
        <Instance position={[0, 0, 0]} castShadow receiveShadow />
        <Instance position={[0, 0, 0]} rotation={[0, THREE.MathUtils.degToRad(180), 0]} castShadow receiveShadow />
        <Instance position={[0, 0, 0]} rotation={[0, THREE.MathUtils.degToRad(90), 0]} castShadow receiveShadow />
        <Instance position={[0, 0, 0]} rotation={[0, THREE.MathUtils.degToRad(-90), 0]} castShadow receiveShadow />
      </Instances>
      <Instances limit={8} geometry={nodes.torch_mounted001.geometry} material={materials['texture.011']}>
        <Instance position={[0, 0, 0]} castShadow receiveShadow />
        <Instance position={[4, 0, 0]} castShadow receiveShadow />
        <Instance position={[0, 0, 0]} rotation={[0, THREE.MathUtils.degToRad(90), 0]} castShadow receiveShadow />
        <Instance position={[0, 0, -4]} rotation={[0, THREE.MathUtils.degToRad(90), 0]} castShadow receiveShadow />
        <Instance position={[0, 0, 0]} rotation={[0, THREE.MathUtils.degToRad(180), 0]} castShadow receiveShadow />
        <Instance position={[-4, 0, 0]} rotation={[0, THREE.MathUtils.degToRad(180), 0]} castShadow receiveShadow />
      </Instances>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.barrel_large_decorated.geometry}
        material={materials['texture.012']}
      />
    </group>
  )
}

useGLTF.preload('/arts/dungeon/Rooms/start.gltf')

export default Start
