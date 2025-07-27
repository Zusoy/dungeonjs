import React from 'react'

type Props = {
  readonly type: 'primary' | 'secondary' | 'neutral'
  readonly delay: number
  readonly onFinish: () => void
}

export const Countdown: React.FC<Props> = ({ type, delay, onFinish }) => {
  const [value, setValue] = React.useState<number>(delay)

  React.useEffect(() => {
    if (Math.max(0, value) === 0) {
      onFinish()
    }
  }, [value, onFinish])

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue(prev => Math.max(prev - 100, 0))
    }, 100)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <progress className={`progress progress-${type} w-56`} max={delay} value={value}></progress>
  )
}
