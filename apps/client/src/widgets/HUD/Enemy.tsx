import React from 'react'
import { SkeletonType } from 'types/enemy'
import { FaShieldAlt } from 'react-icons/fa'
import { motion } from 'motion/react'

type Props = {
  readonly type: SkeletonType
  readonly defense: number
  readonly onClick?: React.MouseEventHandler<HTMLDivElement>
}

const Enemy: React.FC<Props> = ({ type, defense, onClick }) => (
  <motion.div
    className='flex justify-center items-center indicator cursor-pointer'
    onClick={onClick}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0 }}
    transition={{
      duration: 0.4,
      scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
    }}
  >
    <span className="indicator-item badge badge-info relative">
      <FaShieldAlt />
      {defense}
    </span>
    <figure>
      <img alt='avatar' src={`/img/skeleton/${type.toString()}.png`} className='w-12 h-12 rounded-md' />
    </figure>
  </motion.div>
)

export default Enemy
