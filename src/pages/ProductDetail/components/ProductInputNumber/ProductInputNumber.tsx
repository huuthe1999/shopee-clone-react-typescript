import { ChangeEvent, KeyboardEvent } from 'react'

import { Button } from '@/components'

interface Props {
  quantity: number
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onDecrease: () => void
  onIncrease: () => void
  onBlur: () => void
}

export const ProductInputNumber = ({
  quantity,
  onChange,
  onBlur,
  onDecrease,
  onIncrease,
  value
}: Props) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // allow only numeric values and the delete key
    if (event.key !== 'Backspace' && (event.key < '0' || event.key > '9')) {
      event.preventDefault()
    }
  }

  return (
    <>
      <Button
        className="h-full rounded-l px-6 text-gray-600 outline-none"
        onClick={onDecrease}
        disabled={+value === 1}>
        <span className="m-auto text-2xl font-thin">−</span>
      </Button>
      <input
        type="text"
        value={value}
        onKeyDown={handleKeyDown}
        onChange={onChange}
        onBlur={onBlur}
        className="text-md flex w-16 items-center border-x border-x-black/[0.09] text-center font-semibold text-gray-700 outline-none"></input>
      <Button
        className="h-full rounded-l px-6 text-gray-600 outline-none"
        onClick={onIncrease}
        disabled={+value === quantity}>
        <span className="m-auto text-2xl font-thin">+</span>
      </Button>
    </>
  )
}
