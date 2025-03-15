import React from 'react'
import Weapon from 'widgets/HUD/Weapon'

type WeaponLite = {
  readonly icon: string
  readonly attack: number
}

type Props = {
  readonly username: string
  readonly avatar: string
  readonly weapons: WeaponLite[]
}

const PlayerCard: React.FC<Props> = ({ username, avatar, weapons }) => {
  return (
    <div className='card card-side p-2 bg-gradient-to-tr from-orange-100 to-orange-300'>
      <figure>
        <img src={avatar} alt='avatar' className='w-24 h-24' />
      </figure>
      <div className='card-body'>
        <h2 className='card-title text-black'>{username}</h2>
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
