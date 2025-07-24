import React from 'react'
import { loot, selectIsPlayerTurn, selectLootInCurrentCoords } from 'features/Game/Dungeon/application/slice'
import { useDispatch, useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'motion/react'
import { FaRegHand } from 'react-icons/fa6'
import { Tooltip } from 'widgets/HUD/Tooltip'

export const PickLootButton: React.FC = () => {
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
        ? <Tooltip verticalPlacement='bottom' horizontalPlacement='left' content={<p>Loot item</p>}>
            <motion.button
              type='button'
              className='btn btn-primary rounded-b-full h-20 border-transparent bg-gradient-to-b from-amber-100 to-amber-500 hover:border-transparent'
              onClick={pickLoot}
            >
              <FaRegHand className='w-8 h-8' />
            </motion.button>
          </Tooltip>
        : null
      }
    </AnimatePresence>
  )
}
