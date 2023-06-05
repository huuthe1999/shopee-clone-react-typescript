import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { useSearchParams } from 'react-router-dom'

import { BRIEF_CART_SIZE, CART_SIZE, PAGE, QUERY_KEYS } from '@/constants'
import { useAxiosPrivate } from '@/hooks'
import { orderServices } from '@/services'
import { BaseErrorResponse, BaseResponse, ICart, ICartResponse, ISingleCartResponse } from '@/types'

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
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.order.briefList, { status: -1, size: BRIEF_CART_SIZE }]
      })

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.order.list, { size: CART_SIZE, status: -1 }],
        refetchType: 'none'
      })
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
    orderServices.ModifyCartProps
  >({
    mutationFn: ({ actionType, ...rest }) => {
      if (actionType === 0) {
        // Update cart
        const { amount, productId, orderId } = rest as orderServices.UpdateCartProps
        return orderServices.updateCart({ amount, productId, orderId })
      } else {
        // Delete cart
        const { orderIds } = rest as orderServices.DeleteCartProps
        return orderServices.deleteCart({ orderIds })
      }
    },
    onSuccess(data, variables) {
      if (variables.actionType === 1) {
        // Case update order
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.order.list, { size: CART_SIZE, status: -1 }]
        })
        // Invalidate cart in header
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.order.briefList, { status: -1, size: BRIEF_CART_SIZE }]
        })
        return
      } else {
        // Case update order
        const singleCartData = data as AxiosResponse<ISingleCartResponse>
        queryClient.setQueryData<AxiosResponse<ICartResponse>>(
          [QUERY_KEYS.order.list, { page, size: CART_SIZE, status: -1 }],

          (oldData) => {
            if (oldData) {
              const items = oldData.data.data.items.slice(0)

              const oldOrderIndex = items.findIndex((order) => order._id === variables.orderId)

              if (oldOrderIndex !== -1) {
                items.splice(oldOrderIndex, 1, singleCartData.data.data)

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
    }
  })
}
