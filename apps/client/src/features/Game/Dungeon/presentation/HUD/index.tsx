import React from 'react'
import { Tooltip } from 'widgets/HUD/Tooltip'
import { EndTurnButton } from 'features/Game/Dungeon/presentation/HUD/EndTurnButton'
import { PlayerList } from 'features/Game/Dungeon/presentation/HUD/PlayerList'
import { EnemyList } from 'features/Game/Dungeon/presentation/HUD/EnemyList'
import { LootList } from 'features/Game/Dungeon/presentation/HUD/LootList'
import { PickChestButton } from 'features/Game/Dungeon/presentation/HUD/PickChestButton'
import { PickLootButton } from 'features/Game/Dungeon/presentation/HUD/PickLootButton'
import { TurnAnnounceDialog, type TurnAnnouncer } from 'features/Game/Dungeon/presentation/HUD/TurnAnnounceDialog'
import { GameEndDialog, type GameEndDialogRef } from 'features/Game/Dungeon/presentation/HUD/GameEndDialog'
import { useDispatch, useSelector } from 'react-redux'
import { selectPlayerTurn, selectGameEnded, selectWinnerPlayer, selectPlayersWithScores, restartNewGame } from 'features/Game/Dungeon/application/slice'
import { selectPlayers, selectIsHost } from 'features/Lobby/application/slice'
import { CombatHUD } from 'features/Game/Combat/presentation/HUD'

export const GameHUD: React.FC = () => {
  const dispatch = useDispatch()
  const turnAnnouncer = React.useRef<TurnAnnouncer>(null!)
  const gameEndDialog = React.useRef<GameEndDialogRef>(null!)
  const playerTurnId = useSelector(selectPlayerTurn)
  const players = useSelector(selectPlayers)
  const gameEnded = useSelector(selectGameEnded)
  const winnerPlayer = useSelector(selectWinnerPlayer)
  const playersWithScores = useSelector(selectPlayersWithScores)
  const isHost = useSelector(selectIsHost)

  const playerTurn = React.useMemo(
    () => players.find((player) => player.id === playerTurnId),
    [playerTurnId]
  )

  React.useEffect(() => {
    if (!playerTurn) {
      return
    }

    turnAnnouncer.current.announce({
      username: playerTurn.username,
      hero: playerTurn.hero
    })
  }, [playerTurn])

  React.useEffect(() => {
    if (!gameEnded || !winnerPlayer) {
      return
    }

    gameEndDialog.current.show({
      winner: winnerPlayer,
      players: playersWithScores
    }, isHost)
  }, [gameEnded, winnerPlayer, playersWithScores, isHost])

  const requestNewGame = React.useCallback(() => {
    dispatch(restartNewGame({ timestamp: Date.now() }))
  }, [dispatch])

  return (
    <>
      <div className='absolute top-0 flex w-screen'>
        <div className='w-full px-12 h-14 bg-slate-800 border border-transparent flex justify-between items-center md:px-32'>
          <div />
          <div />
          <div className='flex gap-1 items-center'>
            <PickChestButton />
            <PickLootButton />
            <Tooltip content={<p>Ends your turn</p>} horizontalPlacement='left' verticalPlacement='bottom'>
              <EndTurnButton />
            </Tooltip>
          </div>
        </div>
      </div>
      <div className='absolute left-0 flex h-screen items-center justify-center'>
        <EnemyList />
      </div>
      <div className='absolute right-0 flex h-screen items-center justify-center pointer-events-none'>
        <LootList />
      </div>
      <PlayerList />
      <CombatHUD />
      <TurnAnnounceDialog ref={turnAnnouncer} />
      <GameEndDialog
        ref={gameEndDialog}
        onRestart={requestNewGame}
      />
    </>
  )
}
