import React from 'react'
import { EffectComposer, Vignette } from '@react-three/postprocessing'

const PostProcess: React.FC = () => {
  return (
    <EffectComposer>
      <Vignette offset={1} darkness={1} />
    </EffectComposer>
  )
}

export default PostProcess
