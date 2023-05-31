import { ChangeEvent, FocusEvent, KeyboardEvent } from 'react'

import classNames from 'classnames'

import { Button } from '@/components'

export interface InputNumberProps {
  className?: string
  disabled?: boolean
  quantity: number
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onDecrease: () => void
  onIncrease: () => void
  onBlur: (e?: FocusEvent<HTMLInputElement>) => void
}

export const InputNumber = ({
  disabled,
  className,
  quantity,
  onChange,
  onBlur,
  onDecrease,
  onIncrease,
  value
}: InputNumberProps) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // allow only numeric values and the delete key
    if (event.key !== 'Backspace' && (event.key < '0' || event.key > '9')) {
      event.preventDefault()
    }
  }

  return (
    <div
      className={classNames(
        'relative flex flex-row rounded-lg border border-black/[0.09] bg-transparent',
        [className],
        { 'pointer-events-none opacity-80': disabled }
      )}>
      <Button
        className="h-full basis-1/3 rounded-l px-2 text-gray-600 outline-none"
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
        className="text-md flex w-16 basis-1/3 items-center border-x border-x-black/[0.09] text-center font-semibold text-gray-700 outline-none"></input>
      <Button
        className="h-full basis-1/3 rounded-l px-2 text-gray-600 outline-none"
        onClick={onIncrease}
        disabled={+value === quantity}>
        <span className="m-auto text-2xl font-thin">+</span>
      </Button>
    </div>
  )
}
