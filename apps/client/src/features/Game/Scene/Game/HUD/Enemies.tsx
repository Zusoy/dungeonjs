import React from 'react'
import Enemy from 'widgets/HUD/Enemy'
import { focusCoords, selectEnemies } from 'features/Game/slice'
import { useDispatch, useSelector } from 'react-redux'
import { ScalarCoords } from 'types/coords'

const Enemies: React.FC = () => {
  const dispatch = useDispatch()
  const enemies = useSelector(selectEnemies)

  const focusEnemy = (coords: ScalarCoords) => {
    dispatch(focusCoords(coords))
  }

  return (
    <div className='flex flex-col gap-4 p-4 items-center justify-center'>
      {enemies.map(
        enemy =>
          <Enemy
            onClick={() => focusEnemy(enemy.coords)}
            defense={enemy.defense}
            type={enemy.type}
          />
      )}
    </div>
  )
}

export default Enemies
