import React from 'react'
import { selectPlayers, selectPlayerTurn } from 'features/Game/slice'
import { useSelector } from 'react-redux'

const Players: React.FC = () => {
  const players = useSelector(selectPlayers)
  const playerTurn = useSelector(selectPlayerTurn)

  return (
    <div className='flex flex-row gap-2 justify-center'>
      {players.map(
        player =>
          <div key={player.id} className='avatar placeholder cursor-pointer'>
            <div className={`${player.id === playerTurn ? 'ring-success ring-offset-base-100 ring ring-offset-2' : ''} bg-neutral w-12 rounded-full`}>
              <span style={{ color: player.color }}>{player.username.slice(0, 1)}</span>
            </div>
          </div>
      )}
    </div>
  )
}

export default Players
