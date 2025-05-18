import React from 'react'
import Chest from 'widgets/HUD/Chest'
import type { ScalarCoords } from 'types/coords'
import { focusCoords, selectChests } from 'features/Game/slice'
import { useDispatch, useSelector } from 'react-redux'

const Chests: React.FC = () => {
  const dispatch = useDispatch()
  const chests = useSelector(selectChests)

  const focusChest = (coords: ScalarCoords) => {
    dispatch(focusCoords(coords))
  }

  return (
    <div className='flex gap-4 p-4'>
      {chests.map(
        chest => (
          <Chest onClick={() => focusChest(chest.coords)} />
        )
      )}
    </div>
  )
}

export default Chests
