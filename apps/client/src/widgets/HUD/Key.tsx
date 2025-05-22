import React from 'react'
import { motion } from 'motion/react'

type Props = {
  readonly onClick?: React.MouseEventHandler<HTMLDivElement>
}

const Key: React.FC<Props> = ({ onClick }) => (
  <motion.div
    className='flex justify-center items-center cursor-pointer'
    onClick={onClick}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0 }}
    transition={{
      duration: 0.4,
      scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
    }}
  >
    <figure>
      <img alt='avatar' src="img/key.png" className='w-12 h-12 rounded-md' />
    </figure>
  </motion.div>
)

export default Key
