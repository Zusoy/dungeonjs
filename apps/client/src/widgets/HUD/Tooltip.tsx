import React from 'react'
import { motion, AnimatePresence } from 'motion/react'

export type VerticalPlacement = 'top' | 'bottom'
export type HorizontalPlacement = 'left' | 'right'

type Props = React.PropsWithChildren & {
  readonly content: React.ReactNode
  readonly verticalPlacement: VerticalPlacement
  readonly horizontalPlacement: HorizontalPlacement
}

export const Tooltip: React.FC<Props> = ({ children, content, verticalPlacement, horizontalPlacement }) => {
  const [hovered, setHovered] = React.useState<boolean>(false)
  const [position, setPosition] = React.useState<{ x: number, y: number }>({ x: 0, y: 0 })
  const container = React.useRef<HTMLDivElement>(null!)

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = e => {
    if (!container.current) {
      return
    }

    const rect = container.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setPosition({ x, y })
  }

  return (
    <div
      ref={container}
      className='relative inline-block'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: horizontalPlacement === 'left' ? position.x - 50 : position.x + 50,
              y: verticalPlacement === 'bottom' ? position.y + 50 : position.y - 50
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute z-50 w-64 rounded-lg border dark:bg-slate-800 dark:border-slate-700 bg-white p-3 shadow-lg pointer-events-none"
            style={{ bottom: 0, left: 0 }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
