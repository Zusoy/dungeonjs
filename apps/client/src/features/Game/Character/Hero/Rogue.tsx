import React from 'react'
import * as THREE from 'three'
import { useGLTF, useAnimations, Text } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useFrame } from '@react-three/fiber'

type ActionName =
  | '1H_Melee_Attack_Chop'
  | '1H_Melee_Attack_Slice_Diagonal'
  | '1H_Melee_Attack_Slice_Horizontal'
  | '1H_Melee_Attack_Stab'
  | '1H_Ranged_Aiming'
  | '1H_Ranged_Reload'
  | '1H_Ranged_Shoot'
  | '1H_Ranged_Shooting'
  | '2H_Melee_Attack_Chop'
  | '2H_Melee_Attack_Slice'
  | '2H_Melee_Attack_Spin'
  | '2H_Melee_Attack_Spinning'
  | '2H_Melee_Attack_Stab'
  | '2H_Melee_Idle'
  | '2H_Ranged_Aiming'
  | '2H_Ranged_Reload'
  | '2H_Ranged_Shoot'
  | '2H_Ranged_Shooting'
  | 'Block'
  | 'Block_Attack'
  | 'Block_Hit'
  | 'Blocking'
  | 'Cheer'
  | 'Death_A'
  | 'Death_A_Pose'
  | 'Death_B'
  | 'Death_B_Pose'
  | 'Dodge_Backward'
  | 'Dodge_Forward'
  | 'Dodge_Left'
  | 'Dodge_Right'
  | 'Dualwield_Melee_Attack_Chop'
  | 'Dualwield_Melee_Attack_Slice'
  | 'Dualwield_Melee_Attack_Stab'
  | 'Hit_A'
  | 'Hit_B'
  | 'Idle'
  | 'Interact'
  | 'Jump_Full_Long'
  | 'Jump_Full_Short'
  | 'Jump_Idle'
  | 'Jump_Land'
  | 'Jump_Start'
  | 'Lie_Down'
  | 'Lie_Idle'
  | 'Lie_Pose'
  | 'Lie_StandUp'
  | 'PickUp'
  | 'Running_A'
  | 'Running_B'
  | 'Running_Strafe_Left'
  | 'Running_Strafe_Right'
  | 'Sit_Chair_Down'
  | 'Sit_Chair_Idle'
  | 'Sit_Chair_Pose'
  | 'Sit_Chair_StandUp'
  | 'Sit_Floor_Down'
  | 'Sit_Floor_Idle'
  | 'Sit_Floor_Pose'
  | 'Sit_Floor_StandUp'
  | 'Spellcast_Long'
  | 'Spellcast_Raise'
  | 'Spellcast_Shoot'
  | 'Spellcasting'
  | 'T-Pose'
  | 'Throw'
  | 'Unarmed_Idle'
  | 'Unarmed_Melee_Attack_Kick'
  | 'Unarmed_Melee_Attack_Punch_A'
  | 'Unarmed_Melee_Attack_Punch_B'
  | 'Unarmed_Pose'
  | 'Use_Item'
  | 'Walking_A'
  | 'Walking_B'
  | 'Walking_Backwards'
  | 'Walking_C'

interface GLTFAction extends THREE.AnimationClip {
  readonly position: THREE.Vector3
  readonly name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
    Rogue_ArmLeft: THREE.SkinnedMesh
    Rogue_ArmRight: THREE.SkinnedMesh
    Rogue_Body: THREE.SkinnedMesh
    Rogue_Head: THREE.SkinnedMesh
    Rogue_LegLeft: THREE.SkinnedMesh
    Rogue_LegRight: THREE.SkinnedMesh
    Knife_Offhand: THREE.Mesh
    ['1H_Crossbow']: THREE.Mesh
    ['2H_Crossbow']: THREE.Mesh
    Knife: THREE.Mesh
    Throwable: THREE.Mesh
    Rogue_Cape: THREE.Mesh
    root: THREE.Bone
  }
  materials: {
    rogue_texture: THREE.MeshStandardMaterial
  },
  animations: GLTFAction[]
}

type Props = JSX.IntrinsicElements['group'] & {
  readonly position: THREE.Vector3
  readonly username?: string
  readonly color?: string
}

const Rogue: React.FC<Props> = props => {
  const transform = React.useRef<THREE.Group>(null!)
  const { nodes, materials, animations } = useGLTF('/arts/heroes/Characters/gltf/Rogue.glb') as unknown as GLTFResult
  const { actions } = useAnimations<GLTFAction>(animations, transform)
  const position = React.useMemo(() => props.position, [])
  const [animation, setAnimation] = React.useState<ActionName>('Idle')

  React.useEffect(() => {
    actions[animation]?.reset()?.fadeIn(0.1)?.play()

    return () => {
      actions[animation]?.fadeOut(0.1)
    }
  }, [animation, actions])

  useFrame(() => {
    if (transform.current.position.distanceTo(props.position) > 0.1) {
      const direction = transform.current.position
        .clone()
        .sub(props.position)
        .normalize()
        .multiplyScalar(0.032)

      transform.current.position.sub(direction)
      transform.current.lookAt(props.position)

      setAnimation('Walking_A')
    } else {
      setAnimation('Idle')
    }
  })

  return (
    <group ref={transform} {...props} dispose={null} position={position}>
      {props.username &&
        <Text position={[0, 2.7, 0]} color={props.color ?? 'black'} fontSize={0.3}>{props.username}</Text>
      }
      <group name="Scene">
        <group name="Rig">
          <skinnedMesh
            name="Rogue_ArmLeft"
            geometry={nodes.Rogue_ArmLeft.geometry}
            material={materials.rogue_texture}
            skeleton={nodes.Rogue_ArmLeft.skeleton}
          />
          <skinnedMesh
            name="Rogue_ArmRight"
            geometry={nodes.Rogue_ArmRight.geometry}
            material={materials.rogue_texture}
            skeleton={nodes.Rogue_ArmRight.skeleton}
          />
          <skinnedMesh
            name="Rogue_Body"
            geometry={nodes.Rogue_Body.geometry}
            material={materials.rogue_texture}
            skeleton={nodes.Rogue_Body.skeleton}
          />
          <skinnedMesh
            name="Rogue_Head"
            geometry={nodes.Rogue_Head.geometry}
            material={materials.rogue_texture}
            skeleton={nodes.Rogue_Head.skeleton}
          />
          <skinnedMesh
            name="Rogue_LegLeft"
            geometry={nodes.Rogue_LegLeft.geometry}
            material={materials.rogue_texture}
            skeleton={nodes.Rogue_LegLeft.skeleton}
          />
          <skinnedMesh
            name="Rogue_LegRight"
            geometry={nodes.Rogue_LegRight.geometry}
            material={materials.rogue_texture}
            skeleton={nodes.Rogue_LegRight.skeleton}
          />
          <primitive object={nodes.root} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/arts/heroes/Characters/gltf/Rogue.glb')

export default Rogue
