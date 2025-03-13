import React from 'react'
import Weapon from 'widgets/HUD/Weapon'
import { useSelector } from 'react-redux'
import { selectCurrentPlayer } from 'features/Game/slice'

const Inventory: React.FC = () => {
  const player = useSelector(selectCurrentPlayer)
  const inventory = React.useMemo(() => player.inventory, [player])

  return (
    <div className='flex flex-row gap-2 justify-center'>
      {inventory.weapons.map(
        weapon =>
          <Weapon
            key={weapon.id}
            attack={weapon.attack}
            icon={`/img/weapon/${weapon.name.toLowerCase()}.png`}
          />
      )}
    </div>
  )
}

export default Inventory
