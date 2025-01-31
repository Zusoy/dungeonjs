import React from 'react'

type DialogProps = {
  readonly title: string
  readonly description: string
  readonly onValidate: () => void
  readonly onClose: () => void
  readonly validateLabel?: string
  readonly cancelLabel?: string
}

const ValidationDialog = React.forwardRef<HTMLDialogElement, DialogProps>(({ title, description, onClose, onValidate, validateLabel, cancelLabel }, ref) => {
  const id = React.useId()

  const onSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    onValidate()
    onClose()
  }

  return (
    <dialog id={id} ref={ref} className='modal'>
      <div className='modal-box'>
        <form method='dialog'>
          <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
            X
          </button>
        </form>
        <h3 className='font-bold text-lg mb-4 text-center'>{title}</h3>
        <p className='py-4'>{description}</p>
        <div className='w-full flex flex-row gap-2 items-center justify-end'>
          <form method='dialog'>
            <button className='btn btn-error btn-md'>
              {cancelLabel ?? 'Cancel'}
            </button>
          </form>
          <form onSubmit={onSubmit}>
            <button type='submit' className='btn btn-success btn-md'>{validateLabel ?? 'Confirm'}</button>
          </form>
        </div>
      </div>
    </dialog>
  )
})

export default ValidationDialog
