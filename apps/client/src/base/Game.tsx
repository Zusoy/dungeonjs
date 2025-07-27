import React from 'react'
import LobbyScene from 'features/Lobby/presentation'
import GameScene from 'features/Game/Dungeon/presentation'
import FullPageLoader from 'widgets/Loader/FullPageLoader'
import { selectIsGameStarted, selectIsWaitingForPlayers } from 'features/Lobby/application/slice'
import { useSelector } from 'react-redux'

const Game: React.FC = () => {
  const waitingForPlayers = useSelector(selectIsWaitingForPlayers)
  const gameStarted = useSelector(selectIsGameStarted)

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
      <React.Suspense fallback={<FullPageLoader />}>
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
