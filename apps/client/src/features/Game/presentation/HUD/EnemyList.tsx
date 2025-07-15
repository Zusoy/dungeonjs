import React from 'react'
import Enemy from 'widgets/HUD/Enemy'
import { focusCoords, selectEnemies } from 'features/Game/application/slice'
import { useDispatch, useSelector } from 'react-redux'
import { ScalarCoords } from 'types/coords'
import { AnimatePresence } from 'motion/react'
import { LootType, type Loot } from 'types/loot'
import Weapon from 'widgets/HUD/Weapon'
import Key from 'widgets/HUD/Key'
import { Tooltip } from 'widgets/HUD/Tooltip'

const TooltipContent: React.FC<{ loot: Loot }> = ({ loot }) => {
  return (
    <div className='flex flex-col w-full'>
      <div className='text-sm badge badge-primary'>Loot</div>
      <div className='divider' />
      <div className='flex w-full gap-4 flex-wrap'>
        {loot.itemType === LootType.Weapon
          ? <Weapon attack={loot.item.attack} icon={loot.item.icon} />
          : <Key />
        }
      </div>
    </div>
  )
}

export const EnemyList: React.FC = () => {
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
            <Tooltip
              verticalPlacement='bottom'
              horizontalPlacement='right'
              content={<TooltipContent loot={enemy.loot} />}
            >
              <Enemy
                key={enemy.id}
                onClick={() => focusEnemy(enemy.coords)}
                defense={enemy.defense}
                type={enemy.type}
              />
            </Tooltip>
        )}
      </AnimatePresence>
    </div>
  )
}
