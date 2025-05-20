import React from 'react'
import { loot, selectIsPlayerTurn, selectLootInCurrentCoords } from 'features/Game/slice'
import { useDispatch, useSelector } from 'react-redux'

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

  if (!isLocalPlayerTurn || !lootInCurrentCoord) {
    return null
  }

  return (
    <button type='button' className='btn btn-secondary' onClick={pickLoot}>Pick Loot</button>
  )
}

export default PickLoot
