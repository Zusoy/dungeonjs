import React from 'react'
import { delay } from 'utils'

export type DiceFace = 1 | 2 | 3 | 4 | 5 | 6

export type DiceRef = {
  rollTo: (value: DiceFace) => Promise<DiceFace>
}

const faceRotation: Record<number, string> = {
  1: "rotateX(0deg) rotateY(0deg)",
  2: "rotateX(0deg) rotateY(-90deg)",
  3: "rotateX(0deg) rotateY(180deg)",
  4: "rotateX(0deg) rotateY(90deg)",
  5: "rotateX(-90deg) rotateY(0deg)",
  6: "rotateX(90deg) rotateY(0deg)",
}

export const Dice = React.forwardRef<DiceRef>((_, ref) => {
  const diceRef = React.useRef<HTMLDivElement>(null!)

  React.useImperativeHandle(ref, () => ({
    rollTo: async (value: DiceFace): Promise<DiceFace> => {
      const rollX = 720 + Math.random() * 360
      const rollY = 720 + Math.random() * 360
      const final = faceRotation[value]

      diceRef.current.style.transition = "transform 1s ease-out"
      diceRef.current.style.transform = `rotateX(${rollX}deg) rotateY(${rollY}deg)`

      await delay(1000)
      diceRef.current.style.transition = "transform 0.3s ease-in"
      diceRef.current.style.transform = final

      return value
    },
  }), [diceRef])

  return (
    <div className='w-24 h-24 perspective'>
      <div className="dice" ref={diceRef}>
        {[1, 2, 3, 4, 5, 6].map((face) => (
          <div key={face} className={`face face-${face}`}>
            {face}
          </div>
        ))}
      </div>
    </div>
  )
})
