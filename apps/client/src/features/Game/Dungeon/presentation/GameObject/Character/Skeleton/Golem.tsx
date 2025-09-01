import React from 'react'
import * as THREE from 'three'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF, SkeletonUtils } from 'three-stdlib'
import { useGraph } from '@react-three/fiber'

type ActionName =
  | '1H_Melee_Attack_Chop'
  | '1H_Melee_Attack_Jump_Chop'
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
  | 'Death_C_Pose'
  | 'Death_C_Skeletons'
  | 'Death_C_Skeletons_Resurrect'
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
  | 'Idle_B'
  | 'Idle_Combat'
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
  | 'Running_C'
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
  | 'Skeleton_Inactive_Standing_Pose'
  | 'Skeletons_Awaken_Floor'
  | 'Skeletons_Awaken_Floor_Long'
  | 'Skeletons_Awaken_Standing'
  | 'Skeletons_Inactive_Floor_Pose'
  | 'Spawn_Air'
  | 'Spawn_Ground'
  | 'Spawn_Ground_Skeletons'
  | 'Spellcast_Long'
  | 'Spellcast_Raise'
  | 'Spellcast_Shoot'
  | 'Spellcast_Summon'
  | 'Spellcasting'
  | 'T-Pose'
  | 'Taunt'
  | 'Taunt_Longer'
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
  | 'Walking_D_Skeletons'

interface GLTFAction extends THREE.AnimationClip {
  readonly name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
    Skeleton_Golem_ArmLeft: THREE.SkinnedMesh
    Skeleton_Golem_ArmRight: THREE.SkinnedMesh
    Skeleton_Golem_Body: THREE.SkinnedMesh
    Skeleton_Golem_Eyes: THREE.SkinnedMesh
    Skeleton_Golem_Head: THREE.SkinnedMesh
    Skeleton_Golem_Jaw: THREE.SkinnedMesh
    Skeleton_Golem_LegLeft: THREE.SkinnedMesh
    Skeleton_Golem_LegRight: THREE.SkinnedMesh
    root: THREE.Bone
  }
  materials: {
    skeleton: THREE.MeshStandardMaterial
    Glow: THREE.MeshStandardMaterial
  },
  animations: GLTFAction[]
}

const Golem: React.FC<JSX.IntrinsicElements['group']> = props => {
  const transform = React.useRef<THREE.Group>(null!)
  const { scene, materials, animations } = useGLTF('/arts/skeletons/characters/gltf/Skeleton_Golem.glb') as GLTFResult
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes } = useGraph(clone) as unknown as GLTFResult

  const { actions } = useAnimations<GLTFAction>(animations, transform)
  const [animation] = React.useState<ActionName>('Idle_Combat')

  React.useEffect(() => {
    actions[animation]?.reset()?.fadeIn(0.1)?.play()

    return () => {
      actions[animation]?.fadeOut(0.1)
    }
  }, [animation, actions])

  return (
    <group ref={transform} {...props} dispose={null}>
      <group name="Scene">
        <group name="Rig" scale={2}>
          <skinnedMesh
            name="Skeleton_Golem_ArmLeft"
            geometry={nodes.Skeleton_Golem_ArmLeft.geometry}
            material={materials.skeleton}
            skeleton={nodes.Skeleton_Golem_ArmLeft.skeleton}
          />
          <skinnedMesh
            name="Skeleton_Golem_ArmRight"
            geometry={nodes.Skeleton_Golem_ArmRight.geometry}
            material={materials.skeleton}
            skeleton={nodes.Skeleton_Golem_ArmRight.skeleton}
          />
          <skinnedMesh
            name="Skeleton_Golem_Body"
            geometry={nodes.Skeleton_Golem_Body.geometry}
            material={materials.skeleton}
            skeleton={nodes.Skeleton_Golem_Body.skeleton}
          />
          <skinnedMesh
            name="Skeleton_Golem_Eyes"
            geometry={nodes.Skeleton_Golem_Eyes.geometry}
            material={materials.Glow}
            skeleton={nodes.Skeleton_Golem_Eyes.skeleton}
          />
          <skinnedMesh
            name="Skeleton_Golem_Head"
            geometry={nodes.Skeleton_Golem_Head.geometry}
            material={materials.skeleton}
            skeleton={nodes.Skeleton_Golem_Head.skeleton}
          />
          <skinnedMesh
            name="Skeleton_Golem_Jaw"
            geometry={nodes.Skeleton_Golem_Jaw.geometry}
            material={materials.skeleton}
            skeleton={nodes.Skeleton_Golem_Jaw.skeleton}
          />
          <skinnedMesh
            name="Skeleton_Golem_LegLeft"
            geometry={nodes.Skeleton_Golem_LegLeft.geometry}
            material={materials.skeleton}
            skeleton={nodes.Skeleton_Golem_LegLeft.skeleton}
          />
          <skinnedMesh
            name="Skeleton_Golem_LegRight"
            geometry={nodes.Skeleton_Golem_LegRight.geometry}
            material={materials.skeleton}
            skeleton={nodes.Skeleton_Golem_LegRight.skeleton}
          />
          <primitive object={nodes.root} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/arts/skeletons/characters/gltf/Skeleton_Golem.glb')

export default Golem
