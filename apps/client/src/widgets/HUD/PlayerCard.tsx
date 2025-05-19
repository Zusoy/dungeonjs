import React from 'react'
import Weapon from 'widgets/HUD/Weapon'
import { FaHeart } from 'react-icons/fa'

type WeaponLite = {
  readonly icon: string
  readonly attack: number
}

type Props = {
  readonly username: string
  readonly health: number
  readonly avatar: string
  readonly weapons: WeaponLite[]
  readonly onClick?: React.MouseEventHandler<HTMLDivElement>
}

const PlayerCard: React.FC<Props> = ({ username, avatar, health, weapons, onClick }) => {
  return (
    <div className='card card-side bg-base-300 border-base-300 cursor-pointer' onClick={onClick}>
      <figure>
        <img src={avatar} alt='avatar' className='w-24 h-24' />
      </figure>
      <div className='card-body'>
        <div className='flex items-center gap-2'>
          <h2 className='card-title text-white'>{username}</h2>
          <div className='flex gap-1 items-center'>
            {Array.from({ length: health }, () => <FaHeart className='text-red-500' />)}
          </div>
        </div>
        <div className='flex flex-col gap-2 justify-center items-start'>
          <div className='flex flex-row gap-2 justify-center'>
            {weapons.map(
              (weapon, index) => <Weapon key={index} attack={weapon.attack} icon={weapon.icon} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerCard
