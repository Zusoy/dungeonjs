import React from 'react'
import * as THREE from 'three'
import { useGLTF, Merged } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useFrame } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    key: THREE.Mesh
  }
  materials: {
    texture: THREE.MeshStandardMaterial
  }
}

type KeyInstanceContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>
const KeyInstanceContext = React.createContext<KeyInstanceContextType>({} as KeyInstanceContextType)

export const Instances: React.FC<React.PropsWithChildren & JSX.IntrinsicElements['group']> = ({ children, ...props }) => {
  const { nodes } = useGLTF('/arts/dungeon/Props/key.gltf') as unknown as GLTFResult

  const instances = React.useMemo(
    () => ({
      Key: nodes.key,
    }),
    [nodes]
  )

  return (
    <Merged meshes={instances} {...props}>
      {(instances: KeyInstanceContextType) => <KeyInstanceContext.Provider value={instances} children={children} />}
    </Merged>
  )
}

export const Key: React.FC<JSX.IntrinsicElements['group']> = props => {
  const transform = React.useRef<THREE.Group>(null!)
  const instances = React.useContext(KeyInstanceContext)

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
      <instances.Key frustumCulled={false} />
    </group>
  )
}

useGLTF.preload('/arts/dungeon/Props/key.gltf')
