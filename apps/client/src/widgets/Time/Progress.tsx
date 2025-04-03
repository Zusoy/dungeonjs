import React from 'react'

type Props = {
  readonly type: 'primary' | 'secondary' | 'neutral'
  readonly max: number
  readonly onFinish: () => void
}

const Progress: React.FC<Props> = ({ type, max, onFinish }) => {
  const [value, setValue] = React.useState<number>(max)

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
    <progress className={`progress progress-${type} w-56`} max={max} value={value}></progress>
  )
}

export default Progress
