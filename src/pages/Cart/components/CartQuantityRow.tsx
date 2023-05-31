import { ChangeEvent, FocusEvent, memo, useState } from 'react'

import { toast } from 'react-toastify'

import { InputNumber } from '@/components'
import { useUpdateCartMutation } from '@/hooks'

interface Props {
  orderId: string
  productId: string
  value: string
  quantity: number
}

export const CartQuantityRow = memo(({ quantity, value, orderId, productId }: Props) => {
  const [amount, setAmount] = useState(value)
  const updateCartMutation = useUpdateCartMutation()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(event.target.value, 10)
    if (parsedValue > quantity) {
      setAmount(quantity.toString())
    } else {
      setAmount(event.target.value)
    }
  }

  const handleBlurChange = (e?: FocusEvent<HTMLInputElement>) => {
    const currentValue = e?.currentTarget.value

    if (!currentValue || currentValue === '0') {
      setAmount(value)
    } else {
      if (currentValue !== value) {
        updateCartMutation.mutate(
          { actionType: 0, amount: +currentValue, orderId, productId },
          {
            onSuccess(data) {
              toast.success(data.data.message)
            },
            onError(error) {
              toast.error(error.response?.data.message)
            }
          }
        )
      }
    }
  }

  const handleDecrease = () => {
    updateCartMutation.mutate(
      { actionType: 0, amount: +value - 1, orderId, productId },
      {
        onSuccess(data) {
          toast.success(data.data.message)
        },
        onError(error) {
          toast.error(error.response?.data.message)
        }
      }
    )
  }

  const handleIncrease = () => {
    updateCartMutation.mutate(
      { actionType: 0, amount: +value + 1, orderId, productId },
      {
        onSuccess(data) {
          toast.success(data.data.message)
        },
        onError(error) {
          toast.error(error.response?.data.message)
        }
      }
    )
  }

  return (
    <InputNumber
      disabled={updateCartMutation.isLoading}
      quantity={quantity}
      value={amount}
      onChange={handleChange}
      onBlur={handleBlurChange}
      onDecrease={handleDecrease}
      onIncrease={handleIncrease}
    />
  )
})
