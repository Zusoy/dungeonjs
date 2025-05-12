import React from 'react'
import { SkeletonType } from 'types/enemy'
import { FaShieldAlt } from 'react-icons/fa'

type Props = {
  readonly type: SkeletonType
  readonly defense: number
  readonly onClick?: React.MouseEventHandler<HTMLDivElement>
}

const Enemy: React.FC<Props> = ({ type, defense, onClick }) => (
  <div className='flex justify-center items-center indicator cursor-pointer' onClick={onClick}>
    <span className="indicator-item badge badge-primary">
      <FaShieldAlt />
      {defense}
    </span>
    <figure>
      <img alt='avatar' src={`/img/skeleton/${type.toString()}.png`} className='w-12 h-12 rounded-md' />
    </figure>
  </div>
)

export default Enemy
