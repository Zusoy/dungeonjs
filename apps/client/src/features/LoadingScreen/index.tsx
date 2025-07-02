import React from 'react'
import { Progress } from 'widgets/Time/Progress'
import { useProgress } from '@react-three/drei'

export const LoadingScreen: React.FC = () => {
  const { progress } = useProgress()

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <div className='w-3/4 flex flex-col gap-4'>
        <Progress value={progress} max={100} />
        <span className='font-bold text-lg'>Loading...</span>
      </div>
    </div>
  )
}
