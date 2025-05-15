import React from 'react'
import { EffectComposer, DepthOfField, Vignette } from '@react-three/postprocessing'

const PostProcess: React.FC = () => (
  <EffectComposer>
    <DepthOfField focusDistance={0.5} focalLength={1.5} bokehScale={2} height={480} />
    <Vignette eskil={false} offset={0.2} darkness={1.2} />
  </EffectComposer>
)

export default PostProcess
