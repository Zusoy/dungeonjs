import React from 'react'

type Props = {
  readonly icon: string
  readonly attack: number
}

const Weapon: React.FC<Props> = ({ icon, attack }) => {
  return (
    <div className='flex flex-col w-12 rounded-full'>
      <img src={icon} />
      <div className='flex items-center justify-center font-bold border-transparent bg-orange-400'>
        <span className='text-white'>{`+${attack.toString()}`}</span>
      </div>
    </div>
  )
}

export default Weapon
