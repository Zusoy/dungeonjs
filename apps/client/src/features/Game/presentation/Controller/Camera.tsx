import React from 'react'
import { CameraControls } from '@react-three/drei'
import type { ScalarCoords } from 'types/coords'

export type GameCamera = {
  readonly focus: (coords: ScalarCoords) => void
}

export const Camera = React.forwardRef<GameCamera>((_, ref) => {
  const orbitalCamera = React.useRef<CameraControls>(null!)

  React.useImperativeHandle<GameCamera, GameCamera>(ref, () => ({
    focus: (coords: ScalarCoords) => {
      orbitalCamera.current.setLookAt(
        coords[0] * 8,
        orbitalCamera.current.camera.position.y,
        coords[1] * 8,
        coords[0] * 8,
        0,
        coords[1] * 8,
        true
      )
    }
  }), [orbitalCamera])

  return (
    <CameraControls
      ref={orbitalCamera}
      maxDistance={30}
      minDistance={20}
      makeDefault
    />
  )
})
