import React from 'react'
import * as THREE from 'three'
import { useGLTF, Merged } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    chest: THREE.Mesh
    chest_gold_lid: THREE.Mesh
  }
  materials: {
    texture: THREE.MeshStandardMaterial
    ['texture.001']: THREE.MeshStandardMaterial
  }
}

type ChestInstanceContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>
const ChestInstanceContext = React.createContext<ChestInstanceContextType>({} as ChestInstanceContextType)

export const Instances: React.FC<React.PropsWithChildren & JSX.IntrinsicElements['group']> = ({ children, ...props }) => {
  const { nodes } = useGLTF('/arts/dungeon/Props/chest.gltf') as unknown as GLTFResult

  const instances = React.useMemo(
    () => ({
      Chest: nodes.chest,
      Chestgoldlid: nodes.chest_gold_lid,
    }),
    [nodes]
  )

  return (
    <Merged meshes={instances} {...props}>
      {(instances: ChestInstanceContextType) => <ChestInstanceContext.Provider value={instances} children={children} />}
    </Merged>
  )
}

export const Chest: React.FC<JSX.IntrinsicElements['group']> = props => {
  const instances = React.useContext(ChestInstanceContext)

  return (
    <group {...props} dispose={null}>
      <instances.Chest frustumCulled={false} />
      <instances.Chestgoldlid frustumCulled={false} />
    </group>
  )
}

useGLTF.preload('/arts/dungeon/Props/chest.gltf')
