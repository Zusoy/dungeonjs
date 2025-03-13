import React from 'react'
import { MdOutlineFullscreen } from 'react-icons/md'

const Fullscreen: React.FC = () => {
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      return
    }

    document.exitFullscreen()
  }

  return (
    <div className='flex'>
      <button className='btn btn-square btn-outline' type='button' onClick={toggleFullscreen}>
        <MdOutlineFullscreen size={24} />
      </button>
    </div>
  )
}

export default Fullscreen
