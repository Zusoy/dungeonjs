import React from 'react'
import PlayerCard from 'widgets/HUD/PlayerCard'
import { selectPlayers } from 'features/Game/slice'
import { useSelector } from 'react-redux'

const Players: React.FC = () => {
  const players = useSelector(selectPlayers)

  return (
    <div className='absolute bottom-0 max-h-64'>
      <div className='flex w-full flex-wrap py-4 gap-4'>
        {players.map(player =>
          <PlayerCard
            username={player.username}
            avatar={`/img/hero/${player.hero.toString()}.png`}
            weapons={player.inventory.weapons}
          />
        )}
      </div>
    </div>
  )
}

export default Players
