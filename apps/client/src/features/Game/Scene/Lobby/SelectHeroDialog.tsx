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
  const [selectedHero, setSelectedHero] = React.useState<Hero>(Hero.Barbarian)

  const onChange: React.ChangeEventHandler<HTMLSelectElement> = e => {
    const hero = (e.currentTarget.value as Hero)

    if (!Object.values(Hero).includes(hero)) {
      return
    }

    setSelectedHero(hero)
  }

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
        <h3 className='font-bold text-lg mb-4 text-center'>Select Hero</h3>
        <form className='flex flex-col gap-4 justify-center items-center' onSubmit={onSubmit}>
          <select className='select select-primary w-full max-w-xs' name='hero' onChange={onChange} value={selectedHero.toString()}>
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
