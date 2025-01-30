import { changeHero } from 'features/Game/slice'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Hero } from 'services/socket'

type Props = {
  readonly onClose: () => void
}

const SelectHeroDialog = React.forwardRef<HTMLDialogElement, Props>(({ onClose }, ref) => {
  const id = React.useId()
  const dispatch = useDispatch()

  const onSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const hero = data.get('hero')?.toString() || null

    if (!hero || !Object.values(Hero).includes(hero as Hero)) {
      return
    }

    dispatch(changeHero({ hero: (hero as Hero) }))
    onClose()
  }

  return (
    <dialog ref={ref} id={id} className='modal'>
      <div className='modal-box'>
        <h3 className='font-bold text-lg'>Select Hero</h3>
        <form className='flex flex-col gap-4' onSubmit={onSubmit}>
          <select className='select select-primary w-full max-w-xs' name='hero'>
            <option value='knight'>Knight</option>
            <option value='mage'>Mage</option>
            <option value='barbarian'>Barbarian</option>
            <option value='rogue'>Rogue</option>
          </select>
          <button type='submit' className='btn btn-primary btn-outline'>Choose</button>
        </form>
      </div>
    </dialog>
  )
})

export default SelectHeroDialog
