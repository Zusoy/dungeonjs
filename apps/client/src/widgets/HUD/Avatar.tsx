import React from 'react'
import { FaHeart } from 'react-icons/fa'
import { motion } from 'motion/react'

type WeaponLite = {
  readonly icon: string
  readonly attack: number
}

type Props = {
  readonly username: string
  readonly health: number
  readonly avatar: string
  readonly weapons: WeaponLite[]
  readonly keys: number
  readonly treasures: number
  readonly color: string
  readonly onClick?: React.MouseEventHandler<HTMLDivElement>
}

const Avatar: React.FC<Props> = ({
  username,
  health,
  avatar,
  weapons,
  keys,
  treasures,
  color,
  onClick
}) => (
  <motion.div
    className='relative w-24 h-24 rounded-full border-4 cursor-pointer'
    style={{ borderColor: color }}
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
  >
    <div className='flex flex-col items-center justify-center'>
      <div className='flex absolute top-[-30px] items-center justify-center bg-slate-700 p-1 rounded-md'>
        <span className='text-lg font-bold'>{username}</span>
      </div>
      <figure>
        <img alt='avatar' src={avatar} className='rounded-full' />
      </figure>
      {keys > 0 && (
        <div className='flex absolute left-[-70px] bottom-0 top-[-55px] items-center justify-center'>
          <div className='flex justify-center items-center indicator'>
            <span className="indicator-item badge badge-info relative">
              {keys.toString()}
            </span>
            <figure>
              <img alt='avatar' src={`/img/key.png`} className='w-6 h-6 rounded-md md:w-12 md:h-12' />
            </figure>
          </div>
        </div>
      )}
      {treasures > 0 && (
        <div className='flex absolute left-[-70px] bottom-0 top-[60px] items-center justify-center'>
          <div className='flex justify-center items-center indicator'>
            <span className="indicator-item badge badge-info relative">
              {treasures.toString()}
            </span>
            <figure>
              <img alt='avatar' src={`/img/chest.png`} className='w-6 h-6 rounded-md md:w-12 md:h-12' />
            </figure>
          </div>
        </div>
      )}
      {weapons.length > 0 && (
        <div className='flex flex-col gap-2 absolute bottom-0 top-0 right-[-70px] items-center justify-center'>
          {weapons.map(
            weapon => (
              <div className='flex justify-center items-center indicator'>
                <span className="indicator-item badge badge-info relative">
                  {weapon.attack.toString()}
                </span>
                <figure>
                  <img alt='avatar' src={weapon.icon} className='w-6 h-6 rounded-md md:w-12 md:h-12' />
                </figure>
              </div>
            )
          )}
        </div>
      )}
      <div className='bg-slate-700 p-2 rounded-md'>
        <div className='flex gap-1 items-center justify-center'>
          {Array.from({ length: health }, () => <FaHeart className='text-red-500' />)}
        </div>
      </div>
    </div>
  </motion.div>
)

export default Avatar
