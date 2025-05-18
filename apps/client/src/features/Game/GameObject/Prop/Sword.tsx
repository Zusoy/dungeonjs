import React from 'react'
import * as THREE from 'three'
import { useGLTF, Merged } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useFrame } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    Skeleton_Blade_Cube007: THREE.Mesh
  }
  materials: {
    skeleton: THREE.MeshStandardMaterial
  }
}

type SwordInstanceContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>
const SwordInstanceContext = React.createContext<SwordInstanceContextType>({} as SwordInstanceContextType)

export const Instances: React.FC<React.PropsWithChildren & JSX.IntrinsicElements['group']> = ({ children, ...props }) => {
  const { nodes } = useGLTF('/arts/weapons/Sword.gltf') as unknown as GLTFResult

  const instances = React.useMemo(
    () => ({
      SkeletonBladeCube: nodes.Skeleton_Blade_Cube007,
    }),
    [nodes]
  )

  return (
    <Merged meshes={instances} {...props}>
      {(instances: SwordInstanceContextType) => <SwordInstanceContext.Provider value={instances} children={children} />}
    </Merged>
  )
}

export const Sword: React.FC<JSX.IntrinsicElements['group']> = props => {
  const instances = React.useContext(SwordInstanceContext)
  const transform = React.useRef<THREE.Group>(null!)

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    transform.current.position.set(
      transform.current.position.x,
      1 + Math.sin(time * 1.5) * 0.5,
      transform.current.position.z
    )

    transform.current.rotateY(0.05)
  })

  return (
    <group {...props} dispose={null} ref={transform} scale={[2, 2, 2]}>
      <instances.SkeletonBladeCube />
    </group>
  )
}

useGLTF.preload('/arts/weapons/Sword.gltf')
