import React from 'react'
import * as THREE from 'three'
import { useGLTF, useAnimations, Text } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

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
  readonly name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
    Knight_ArmLeft: THREE.SkinnedMesh
    Knight_ArmRight: THREE.SkinnedMesh
    Knight_Body: THREE.SkinnedMesh
    Knight_Head: THREE.SkinnedMesh
    Knight_LegLeft: THREE.SkinnedMesh
    Knight_LegRight: THREE.SkinnedMesh
    ['1H_Sword_Offhand']: THREE.Mesh
    Badge_Shield: THREE.Mesh
    Rectangle_Shield: THREE.Mesh
    Round_Shield: THREE.Mesh
    Spike_Shield: THREE.Mesh
    ['1H_Sword']: THREE.Mesh
    ['2H_Sword']: THREE.Mesh
    Knight_Helmet: THREE.Mesh
    Knight_Cape: THREE.Mesh
    root: THREE.Bone
  }
  materials: {
    knight_texture: THREE.MeshStandardMaterial
  },
  animations: GLTFAction[]
}

type Props = JSX.IntrinsicElements['group'] & {
  readonly username?: string
  readonly color?: string
}

const Knight: React.FC<Props> = props => {
  const transform = React.useRef<THREE.Group>(null!)
  const { nodes, materials, animations } = useGLTF('/arts/heroes/Characters/gltf/Knight.glb') as unknown as GLTFResult
  const { actions } = useAnimations<GLTFAction>(animations, transform)

  React.useEffect(() => {
    actions.Idle?.reset()?.play()

    return () => {
      actions.Idle?.stop()
    }
  }, [actions])

  return (
    <group ref={transform} {...props} dispose={null}>
      {props.username &&
        <Text position={[0, 2.7, 0]} color={props.color ?? 'black'} fontSize={0.3}>{props.username}</Text>
      }
      <group name="Scene">
        <group name="Rig">
          <skinnedMesh
            name="Knight_ArmLeft"
            geometry={nodes.Knight_ArmLeft.geometry}
            material={materials.knight_texture}
            skeleton={nodes.Knight_ArmLeft.skeleton}
          />
          <skinnedMesh
            name="Knight_ArmRight"
            geometry={nodes.Knight_ArmRight.geometry}
            material={materials.knight_texture}
            skeleton={nodes.Knight_ArmRight.skeleton}
          />
          <skinnedMesh
            name="Knight_Body"
            geometry={nodes.Knight_Body.geometry}
            material={materials.knight_texture}
            skeleton={nodes.Knight_Body.skeleton}
          />
          <skinnedMesh
            name="Knight_Head"
            geometry={nodes.Knight_Head.geometry}
            material={materials.knight_texture}
            skeleton={nodes.Knight_Head.skeleton}
          />
          <skinnedMesh
            name="Knight_LegLeft"
            geometry={nodes.Knight_LegLeft.geometry}
            material={materials.knight_texture}
            skeleton={nodes.Knight_LegLeft.skeleton}
          />
          <skinnedMesh
            name="Knight_LegRight"
            geometry={nodes.Knight_LegRight.geometry}
            material={materials.knight_texture}
            skeleton={nodes.Knight_LegRight.skeleton}
          />
          <primitive object={nodes.root} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/arts/heroes/Characters/gltf/Knight.glb')

export default Knight
