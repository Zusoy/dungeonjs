import React from 'react'
import Enemy from 'widgets/HUD/Enemy'
import { focusCoords, selectEnemies } from 'features/Game/slice'
import { useDispatch, useSelector } from 'react-redux'
import { ScalarCoords } from 'types/coords'
import { AnimatePresence } from 'motion/react'

const Enemies: React.FC = () => {
  const dispatch = useDispatch()
  const enemies = useSelector(selectEnemies)

  const focusEnemy = (coords: ScalarCoords) => {
    dispatch(focusCoords(coords))
  }

  return (
    <div className='flex flex-col gap-4 p-4 items-center justify-center'>
      <AnimatePresence>
        {enemies.map(
          enemy =>
            <Enemy
              key={enemy.id}
              onClick={() => focusEnemy(enemy.coords)}
              defense={enemy.defense}
              type={enemy.type}
            />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Enemies
