import React from 'react'
import Scene from 'features/Game/Scene/Lobby/Scene'
import ValidationDialog from 'widgets/Dialog/ValidationDialog'
import SelectHeroDialog from 'features/Game/Scene/Lobby/SelectHeroDialog'
import { useDispatch, useSelector } from 'react-redux'
import { leave, selectCurrentRoomId } from 'features/Rooms/slice'
import { selectIsHost, startGame } from 'features/Game/slice'

const Lobby: React.FC = () => {
  const dispatch = useDispatch()
  const currentRoomId = useSelector(selectCurrentRoomId)
  const isHost = useSelector(selectIsHost)
  const selectHeroDialog = React.useRef<HTMLDialogElement>(null!)
  const leaveValidationDialog = React.useRef<HTMLDialogElement>(null!)

  const leaveValidationDescription = React.useMemo<string>(() => {
    return isHost
      ? 'Are you sure to leave ? This will delete your game and kick all current players.'
      : 'Are you sure to leave the game ?'
  }, [isHost])

  const launchGame = React.useCallback(() => {
    if (!isHost || !currentRoomId) {
      return
    }

    dispatch(startGame({ roomId: currentRoomId }))
  }, [isHost, currentRoomId, dispatch])

  const leaveRoom = React.useCallback(() => {
    if (!currentRoomId) {
      return
    }

    dispatch(leave({ roomId: currentRoomId }))
  }, [dispatch, currentRoomId])

  return (
    <div className='flex flex-col gap-8 h-screen justify-center items-center'>
      <Scene />
      <div className='flex flex-col gap-4 items-center justify-center w-full z-[999]'>
        <div className='absolute top-0 p-5 join join-vertical lg:join-horizontal'>
          <button
            type='button'
            className='btn join-item btn-md btn-error'
            onClick={() => leaveValidationDialog.current.showModal()}
          >
            Leave
          </button>
          {isHost
            ? <button type='button' className='btn join-item btn-md btn-success' onClick={launchGame}>Start</button>
            : null
          }
          <button
            type='button'
            className='btn join-item btn-md btn-primary'
            onClick={() => selectHeroDialog.current.showModal()}
          >
            Select hero
          </button>
        </div>
      </div>
      <SelectHeroDialog
        ref={selectHeroDialog}
        onClose={() => selectHeroDialog.current.close()}
      />
      <ValidationDialog
        ref={leaveValidationDialog}
        title='Leave the game'
        description={leaveValidationDescription}
        onClose={() => leaveValidationDialog.current.close()}
        onValidate={leaveRoom}
      />
    </div>
  )
}

export default Lobby
