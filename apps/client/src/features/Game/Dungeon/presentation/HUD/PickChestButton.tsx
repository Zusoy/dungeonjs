import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'motion/react'
import {
  pickChest,
  selectChestInCurrentCoords,
  selectCurrentPlayer,
  selectIsPlayerTurn
} from 'features/Game/Dungeon/application/slice'
import { GiOpenTreasureChest } from 'react-icons/gi'

export const PickChestButton: React.FC = () => {
  const dispatch = useDispatch()
  const isLocalPlayerTurn = useSelector(selectIsPlayerTurn)
  const currentPlayer = useSelector(selectCurrentPlayer)
  const chestInCurrentCoord = useSelector(selectChestInCurrentCoords)

  const pickChestHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!isLocalPlayerTurn || !chestInCurrentCoord) {
      return
    }

    dispatch(pickChest({ chestId: chestInCurrentCoord.id }))
  }

  return (
    <AnimatePresence>
      {(isLocalPlayerTurn && chestInCurrentCoord && currentPlayer.inventory.keys > 0)
        ? <motion.button
            type='button'
            className='btn btn-primary rounded-b-full h-20 border-transparent bg-gradient-to-b from-amber-100 to-amber-500 hover:border-transparent'
            onClick={pickChestHandler}
          >
            <GiOpenTreasureChest className='w-8 h-8' />
          </motion.button>
        : null
      }
    </AnimatePresence>
  )
}
