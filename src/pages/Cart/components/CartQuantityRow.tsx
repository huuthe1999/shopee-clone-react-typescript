import { ChangeEvent, useCallback, useState } from 'react'

import { InputNumber } from '@/components'

interface Props {
  value: string
  quantity: number
}

export const CartQuantityRow = ({ quantity, value: initValue }: Props) => {
  const [amount, setAmount] = useState(initValue)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(event.target.value, 10)
    if (parsedValue > quantity) {
      setAmount(quantity.toString())
    } else {
      setAmount(event.target.value)
    }
  }

  const handleBlurChange = () => {
    if (amount === '' || amount === '0') {
      setAmount('1')
    }
  }

  const handleDecrease = useCallback(() => {
    setAmount((prev) => (+prev - 1).toString())
  }, [])

  const handleIncrease = useCallback(() => {
    setAmount((prev) => (+prev + 1).toString())
  }, [])

  return (
    <InputNumber
      quantity={quantity}
      value={amount}
      onChange={handleChange}
      onBlur={handleBlurChange}
      onDecrease={handleDecrease}
      onIncrease={handleIncrease}
    />
  )
}
