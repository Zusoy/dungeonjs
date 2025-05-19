import React from 'react'
import Weapon from 'widgets/HUD/Weapon'
import Chest from 'widgets/HUD/Chest'
import Key from 'widgets/HUD/Key'
import { focusCoords, selectChests, selectKeyLoots, selectWeaponLoots } from 'features/Game/slice'
import { useDispatch, useSelector } from 'react-redux'
import { ScalarCoords } from 'types/coords'

const Loots: React.FC = () => {
  const dispatch = useDispatch()
  const weapons = useSelector(selectWeaponLoots)
  const chests = useSelector(selectChests)
  const keys = useSelector(selectKeyLoots)

  const focusObject = (coords: ScalarCoords) => {
    dispatch(focusCoords(coords))
  }

  return (
    <div className='flex gap-4 p-4'>
      {weapons.map(
        loot => (
          <Weapon
            icon={loot.item.icon}
            attack={loot.item.attack}
            onClick={() => focusObject(loot.coords)}
          />
        )
      )}
      {chests.map(
        chest => (
          <Chest onClick={() => focusObject(chest.coords)} />
        )
      )}
      {keys.map(
        key => (
          <Key onClick={() => focusObject(key.coords)} />
        )
      )}
    </div>
  )
}

export default Loots
