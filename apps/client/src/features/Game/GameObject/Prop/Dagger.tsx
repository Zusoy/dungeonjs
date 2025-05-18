import React from 'react'
import * as THREE from 'three'
import { useGLTF, Merged } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useFrame } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    Skeleton_Dagger_Cube16554: THREE.Mesh
  }
  materials: {
    skeleton: THREE.MeshStandardMaterial
  }
}

type DaggerInstanceContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>
const DaggerInstanceContext = React.createContext<DaggerInstanceContextType>({} as DaggerInstanceContextType)

export const Instances: React.FC<React.PropsWithChildren & JSX.IntrinsicElements['group']> = ({ children, ...props }) => {
  const { nodes } = useGLTF('/arts/weapons/Dagger.gltf') as unknown as GLTFResult

  const instances = React.useMemo(
    () => ({
      SkeletonDaggerCube: nodes.Skeleton_Dagger_Cube16554,
    }),
    [nodes]
  )

  return (
    <Merged meshes={instances} {...props}>
      {(instances: DaggerInstanceContextType) => <DaggerInstanceContext.Provider value={instances} children={children} />}
    </Merged>
  )
}

export const Dagger: React.FC<JSX.IntrinsicElements['group']> = props => {
  const instances = React.useContext(DaggerInstanceContext)
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
      <instances.SkeletonDaggerCube />
    </group>
  )
}

useGLTF.preload('/arts/weapons/Dagger.gltf')
