import React from 'react'
import Avatar from 'widgets/HUD/Avatar'
import { focusCoords, selectPlayers } from 'features/Game/slice'
import { useDispatch, useSelector } from 'react-redux'

const Players: React.FC = () => {
  const dispatch = useDispatch()
  const players = useSelector(selectPlayers)

  return (
    <div className='hidden absolute bottom-10 w-screen md:flex'>
      <div className='flex py-4 gap-44 w-screen items-center justify-center'>
        {players.map(player =>
          <Avatar
            key={player.id}
            username={player.username}
            avatar={`/img/hero/${player.hero.toString()}.png`}
            weapons={player.inventory.weapons}
            health={player.health}
            keys={player.inventory.keys}
            treasures={player.inventory.treasures}
            color={player.color}
            onClick={() => dispatch(focusCoords(player.coords))}
          />
        )}
      </div>
    </div>
  )
}

export default Players
