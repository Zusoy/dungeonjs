import React from 'react'
import Scene from 'features/Game/Scene/Lobby/Scene'
import SelectHeroDialog from 'features/Game/Scene/Lobby/SelectHeroDialog'

const Lobby: React.FC = () => {
  const selectHeroDialog = React.useRef<HTMLDialogElement>(null!)

  const openHeroSelectionDialog = React.useCallback(() => {
    if (!selectHeroDialog.current) {
      return
    }

    selectHeroDialog.current.showModal()
  }, [selectHeroDialog])

  return (
    <div className='flex flex-col gap-8 h-screen justify-center items-center'>
      <Scene />
      <div className='flex flex-col gap-4 items-center justify-center w-full z-[999]'>
        <div className='absolute top-0 p-5'>
          <button type='button' className='btn btn-md btn-accent' onClick={openHeroSelectionDialog}>Select hero</button>
        </div>
      </div>
      <SelectHeroDialog
        ref={selectHeroDialog}
        onClose={() => selectHeroDialog.current.close()}
      />
    </div>
  )
}

export default Lobby
