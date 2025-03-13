import React from 'react'
import Loading from 'features/Game/Loading'
import LobbyScene from 'features/Game/Scene/Lobby'
import GameScene from 'features/Game/Scene/Game'
import { useSelector } from 'react-redux'
import { selectInLobby, selectIsStarted } from 'features/Game/slice'

const Game: React.FC = () => {
  const waitingForPlayers = useSelector(selectInLobby)
  const gameStarted = useSelector(selectIsStarted)

  React.useEffect(() => {
    const beforeUnloadListener = (e: BeforeUnloadEvent): void => {
      e.preventDefault()
    }

    window.addEventListener('beforeunload', beforeUnloadListener)

    return () => {
      window.removeEventListener('beforeunload', beforeUnloadListener)
    }
  }, [])

  return (
    <div style={{ width: window.innerWidth, height: window.innerHeight }} className='overflow-hidden absolute top-0'>
      <React.Suspense fallback={<Loading />}>
        {waitingForPlayers
          ? <LobbyScene />
          : null
        }
        {gameStarted
          ? <GameScene />
          : null
        }
      </React.Suspense>
    </div>
  )
}

export default Game
