import React from 'react'

type Props = {
  readonly onClick?: React.MouseEventHandler<HTMLDivElement>
}

const Chest: React.FC<Props> = ({ onClick }) => (
  <div className='flex justify-center items-center cursor-pointer' onClick={onClick}>
    <figure>
      <img alt='avatar' src="img/chest.png" className='w-12 h-12 rounded-md' />
    </figure>
  </div>
)

export default Chest
