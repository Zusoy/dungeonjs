import React from 'react'
import { motion } from 'motion/react'

type Props = {
  readonly icon: string
  readonly attack: number
  readonly onClick?: React.MouseEventHandler<HTMLDivElement>
}

const Weapon: React.FC<Props> = ({ icon, attack, onClick }) => {
  return (
    <motion.div
      className='flex flex-col w-12 rounded-full cursor-pointer'
      onClick={onClick}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
    >
      <img src={icon} />
      <div className='flex items-center justify-center font-bold border-transparent bg-gray-500'>
        <span className='text-white'>{`+${attack.toString()}`}</span>
      </div>
    </motion.div>
  )
}

export default Weapon
