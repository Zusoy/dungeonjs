import React from 'react'

type Props = {
  readonly icon: string
  readonly attack: number
  readonly onClick?: React.MouseEventHandler<HTMLDivElement>
}

const Weapon: React.FC<Props> = ({ icon, attack, onClick }) => {
  return (
    <div className='flex flex-col w-12 rounded-full cursor-pointer' onClick={onClick}>
      <img src={icon} />
      <div className='flex items-center justify-center font-bold border-transparent bg-gray-500'>
        <span className='text-white'>{`+${attack.toString()}`}</span>
      </div>
    </div>
  )
}

export default Weapon
