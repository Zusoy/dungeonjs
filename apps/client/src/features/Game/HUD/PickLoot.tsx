import React from 'react'
import { loot, selectIsPlayerTurn, selectLootInCurrentCoords } from 'features/Game/slice'
import { useDispatch, useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'motion/react'

const PickLoot: React.FC = () => {
  const dispatch = useDispatch()
  const isLocalPlayerTurn = useSelector(selectIsPlayerTurn)
  const lootInCurrentCoord = useSelector(selectLootInCurrentCoords)

  const pickLoot: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!isLocalPlayerTurn || !lootInCurrentCoord) {
      return
    }

    dispatch(loot({ lootId: lootInCurrentCoord.id }))
  }

  return (
    <AnimatePresence>
      {isLocalPlayerTurn && lootInCurrentCoord
        ? <motion.button type='button' className='btn btn-secondary' onClick={pickLoot}>Pick Loot</motion.button>
        : null
      }
    </AnimatePresence>
  )
}

export default PickLoot
