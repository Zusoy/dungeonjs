import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'motion/react'
import {
  pickChest,
  selectChestInCurrentCoords,
  selectCurrentPlayer,
  selectIsPlayerTurn
} from 'features/Game/application/slice'

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
        ? <motion.button type='button' className='btn btn-primary' onClick={pickChestHandler}>Pick Chest</motion.button>
        : null
      }
    </AnimatePresence>
  )
}
