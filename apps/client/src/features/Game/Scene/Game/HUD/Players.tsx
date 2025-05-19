import React from 'react'
import PlayerCard from 'widgets/HUD/PlayerCard'
import { focusCoords, selectPlayers } from 'features/Game/slice'
import { useDispatch, useSelector } from 'react-redux'

const Players: React.FC = () => {
  const dispatch = useDispatch()
  const players = useSelector(selectPlayers)

  return (
    <div className='absolute bottom-0 max-h-64'>
      <div className='hidden flex-wrap py-4 gap-4 w-screen items-center justify-center md:flex'>
        {players.map(player =>
          <PlayerCard
            key={player.id}
            username={player.username}
            avatar={`/img/hero/${player.hero.toString()}.png`}
            weapons={player.inventory.weapons}
            health={player.health}
            onClick={() => dispatch(focusCoords(player.coords))}
          />
        )}
      </div>
    </div>
  )
}

export default Players
