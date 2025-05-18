import React from 'react'
import * as THREE from 'three'
import { useGLTF, Merged } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useFrame } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    Skeleton_Axe_Cylinder002: THREE.Mesh
  }
  materials: {
    skeleton: THREE.MeshStandardMaterial
  }
}

type AxeInstanceContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>
const AxeInstanceContext = React.createContext<AxeInstanceContextType>({} as AxeInstanceContextType)

export const Instances: React.FC<React.PropsWithChildren & JSX.IntrinsicElements['group']> = ({ children, ...props }) => {
  const { nodes } = useGLTF('/arts/weapons/Axe.gltf') as unknown as GLTFResult

  const instances = React.useMemo(
    () => ({
      SkeletonAxeCylinder: nodes.Skeleton_Axe_Cylinder002,
    }),
    [nodes]
  )

  return (
    <Merged meshes={instances} {...props}>
      {(instances: AxeInstanceContextType) => <AxeInstanceContext.Provider value={instances} children={children} />}
    </Merged>
  )
}

export const Axe: React.FC<JSX.IntrinsicElements['group']> = props => {
  const instances = React.useContext(AxeInstanceContext)
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
      <instances.SkeletonAxeCylinder />
    </group>
  )
}

useGLTF.preload('/arts/weapons/Axe.gltf')
