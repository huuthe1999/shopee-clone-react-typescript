import { ChangeEvent, useCallback, useState } from 'react'

import classNames from 'classnames'
import { ShoppingCart } from 'react-feather'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button } from '@/components'
import { PATHS } from '@/constants'
import { useAuthContext } from '@/contexts'
import { useAddToCartMutation } from '@/hooks'
import { ICart } from '@/types'

import { ProductInputNumber } from '../ProductInputNumber'

interface ProductPurchaseProps extends Omit<ICart['brief_product'], '_id'> {
  quantity: number
  shopType: number
  productId: string
}

export const ProductPurchase = ({
  quantity,
  shopType,
  productId,
  name,
  image,
  price,
  ...rest
}: ProductPurchaseProps) => {
  const [amount, setAmount] = useState('1')

  const { accessToken } = useAuthContext()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { mutate: addToCartMutate, isLoading } = useAddToCartMutation()

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

  const handlePurchase = useCallback(() => {
    if (accessToken) {
      addToCartMutate(
        {
          amount: Number(amount),
          productId,
          brief_product: {
            name,
            image,
            price,
            ...rest
          }
        },
        {
          onError(error) {
            toast.error(error.response?.data.message)
          },
          onSuccess(data) {
            toast.success(data.data.message)
          }
        }
      )
    } else {
      navigate(
        { pathname: PATHS.LOGIN_PATH, search: `?callback=${pathname}` },
        {
          state: { from: location }
        }
      )
    }
  }, [accessToken, amount, image, name, price, productId, pathname])

  return (
    <>
      {/* Quantity */}
      <div className="flex items-center gap-x-4 text-sm">
        <span className="min-w-[6.875rem] text-neutral-500">Số Lượng</span>
        <div className="flex flex-wrap gap-4">
          <div className="relative mt-1 flex h-10 flex-row rounded-lg border border-black/[0.09] bg-transparent">
            <ProductInputNumber
              value={amount}
              quantity={quantity}
              onChange={handleChange}
              onBlur={handleBlurChange}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />
          </div>
          <span className="m-auto text-neutral-500">{quantity} sản phẩm có sẵn</span>
        </div>
      </div>
      {/* Cart & Buy now */}
      <div className="flex gap-x-4">
        <Button
          disabled={isLoading}
          className={classNames(
            'text-md flex flex-nowrap items-center gap-x-2 rounded-sm border bg-neutral-100 px-4 py-3 capitalize transition hover:bg-neutral-50',
            {
              'border-primary text-primary': shopType !== 1,
              'border-red-700 text-red-700': shopType === 1
            }
          )}
          onClick={handlePurchase}>
          <ShoppingCart />
          <span className="font-medium">Thêm Vào Giỏ Hàng</span>
        </Button>
        <Button
          disabled={isLoading}
          className={classNames('text-md rounded-sm px-4 py-3 capitalize text-white transition', {
            'bg-primary hover:bg-primary/90': shopType !== 1,
            'bg-red-700 hover:bg-red-700/90': shopType === 1
          })}>
          Mua Ngay
        </Button>
      </div>
    </>
  )
}
