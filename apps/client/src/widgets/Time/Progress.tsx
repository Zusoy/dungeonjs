import React from 'react'

type Props = {
  readonly max: number
  readonly value: number
}

export const Progress: React.FC<Props> = ({ value, max }) => {
  return (
    <progress className="progress progress-primary w-full" value={value} max={max} />
  )
}
