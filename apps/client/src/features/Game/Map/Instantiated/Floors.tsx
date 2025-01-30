import React from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'
import { FloorBlock } from 'features/Game/Map/types'
import { Instance, Instances, useGLTF } from '@react-three/drei'

type GLTFResult = GLTF & {
  nodes: {
    floor_tile_large: THREE.Mesh
  }
  materials: {
    texture: THREE.MeshStandardMaterial
  }
}

type Props = {
  blocks: FloorBlock[]
}

const FloorInstance: React.FC<JSX.IntrinsicElements['group']> = props =>
  <group {...props}>
    <Instance />
  </group>

const Floors: React.FC<Props> = ({ blocks }) => {
  const { nodes, materials } = useGLTF('/arts/dungeon/Assets/gltf/floor_tile_large.gltf') as unknown as GLTFResult

  return (
    <Instances range={blocks.length} material={materials.texture} geometry={nodes.floor_tile_large.geometry}>
      {blocks.map(block => <FloorInstance key={block.id} position={block.position} />)}
    </Instances>
  )
}

export default Floors
