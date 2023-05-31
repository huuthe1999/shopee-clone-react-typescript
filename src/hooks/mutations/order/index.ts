import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { useSearchParams } from 'react-router-dom'

import { CART_SIZE, PAGE, QUERY_KEYS } from '@/constants'
import { useAxiosPrivate } from '@/hooks'
import { orderServices } from '@/services'
import {
  BaseErrorResponse,
  BaseResponse,
  ICart,
  ICartResponse,
  ISingleCartResponse,
  isUpdateCart
} from '@/types'

export const useAddToCartMutation = () => {
  useAxiosPrivate()
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<BaseResponse>,
    AxiosError<BaseErrorResponse<Pick<ICart, 'amount' | 'status'>>>,
    orderServices.AddToCartProps
  >({
    mutationFn: ({ amount, productId }) => orderServices.addToCart({ amount, productId }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.order, { status: -1 }] })
    }
  })
}

export const useUpdateCartMutation = () => {
  useAxiosPrivate()
  const queryClient = useQueryClient()
  const [params] = useSearchParams()

  const pageParam = params.get('page')
  const page = pageParam ? +pageParam : PAGE + 1

  return useMutation<
    AxiosResponse<ISingleCartResponse | BaseResponse>,
    AxiosError<BaseResponse>,
    orderServices.UpdateCartProps
  >({
    mutationFn: ({ actionType, orderId, ...rest }) => {
      if (actionType === 0) {
        const { amount, productId } = rest as orderServices.AddToCartProps
        return orderServices.updateCart({ amount, productId, actionType, orderId })
      }
      return orderServices.updateCart({ actionType, orderId })
    },
    onSuccess(data, variables) {
      queryClient.setQueryData<AxiosResponse<ICartResponse>>(
        [QUERY_KEYS.order, { page, size: CART_SIZE, status: -1 }],

        (oldData) => {
          if (oldData) {
            const items = oldData.data.data.items.splice(0)

            const oldOrderIndex = items.findIndex((order) => order._id === variables.orderId)

            if (oldOrderIndex !== -1) {
              if (isUpdateCart(data.data)) {
                items.splice(oldOrderIndex, 1, data.data.data)
              } else {
                items.splice(oldOrderIndex, 1)
              }

              return {
                ...oldData,
                data: {
                  ...oldData.data,
                  data: { ...oldData.data.data, items }
                }
              }
            }
          }

          return oldData
        }
      )
    }
  })
}
