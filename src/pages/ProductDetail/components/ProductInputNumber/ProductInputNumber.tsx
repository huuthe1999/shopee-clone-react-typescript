import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react'

import { Button } from '@/components'

interface Props {
  quantity: number
}

export const ProductInputNumber = ({ quantity }: Props) => {
  const [value, setValue] = useState('1')

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // allow only numeric values and the delete key
    if (event.key !== 'Backspace' && (event.key < '0' || event.key > '9')) {
      event.preventDefault()
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(event.target.value, 10)
    if (parsedValue > quantity) {
      setValue(quantity.toString())
    } else {
      setValue(event.target.value || '')
    }
  }

  const handleBlurChange = () => {
    if (value === '' || value === '0') {
      setValue('1')
    }
  }

  const handleDecrease = useCallback(() => {
    setValue((prev) => (+prev - 1).toString())
  }, [])

  const handleIncrease = useCallback(() => {
    setValue((prev) => (+prev + 1).toString())
  }, [])

  return (
    <>
      <Button
        className="h-full rounded-l px-6 text-gray-600 outline-none"
        onClick={handleDecrease}
        disabled={+value === 1}>
        <span className="m-auto text-2xl font-thin">−</span>
      </Button>
      <input
        type="text"
        value={value}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onBlur={handleBlurChange}
        className="text-md flex w-16 items-center border-x border-x-black/[0.09] text-center font-semibold text-gray-700 outline-none"></input>
      <Button
        className="h-full rounded-l px-6 text-gray-600 outline-none"
        onClick={handleIncrease}
        disabled={+value === quantity}>
        <span className="m-auto text-2xl font-thin">+</span>
      </Button>
    </>
  )
}
