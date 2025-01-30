import React from 'react'
import Loading from 'features/Game/Loading'
import { useSelector } from 'react-redux'
import { selectInLobby } from 'features/Game/slice'
import LobbyScene from 'features/Game/Scene/Lobby'
import GameScene from 'features/Game/Scene/Game'

const Game: React.FC = () => {
  const waitingForPlayers = useSelector(selectInLobby)

  return (
    <div style={{ width: window.innerWidth, height: window.innerHeight }}>
      <React.Suspense fallback={<Loading />}>
        {waitingForPlayers
          ? <LobbyScene />
          : <GameScene />
        }
      </React.Suspense>
    </div>
  )
}

export default Game
