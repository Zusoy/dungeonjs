import React from 'react'

const FullPageLoader: React.FC = () => (
  <div className='h-screen w-screen flex justify-center items-center'>
    <span className='loading loading-spinner loading-xl'></span>
  </div>
)

export default FullPageLoader
