import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AUTH, BRIEF_CART_SIZE, CART_SIZE, PAGE, QUERY_KEYS, SIZE } from '@/constants'
import { useAxiosPrivate } from '@/hooks'
import { orderServices } from '@/services'
import {
  BaseErrorResponse,
  BaseResponse,
  ICart,
  IDataPaginationResponse,
  IDataResponse,
  IErrorResponse,
  IProductOrdered,
  IProductSelected
} from '@/types'
import { authUtils } from '@/utils'

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
    AxiosResponse<IDataResponse<ICart> | BaseResponse>,
    AxiosError<BaseResponse>,
    orderServices.ModifyCartProps
  >({
    mutationKey: [QUERY_KEYS.order.update],
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
      const productsCartPersistData: IProductSelected[] | undefined = authUtils.getItem(
        AUTH.CART_CHECKOUT
      )

      if (variables.actionType === 1) {
        // Case delete order
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.order.list, { size: CART_SIZE, status: -1 }]
        })
        // Invalidate cart in header
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.order.briefList, { status: -1, size: BRIEF_CART_SIZE }]
        })
        // Update cart checkout if exist
        if (productsCartPersistData) {
          authUtils.setItem(
            AUTH.CART_CHECKOUT,
            productsCartPersistData?.filter((order) => order._id !== variables.orderIds[0])
          )
        }
      } else {
        // Case update order
        const singleCartData = data as AxiosResponse<IDataResponse<ICart>>
        queryClient.setQueryData<AxiosResponse<IDataPaginationResponse<ICart[]>>>(
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
        // Update cart checkout if exist
        if (productsCartPersistData) {
          authUtils.setItem(
            AUTH.CART_CHECKOUT,
            productsCartPersistData?.map((order) => {
              if (order._id === variables.orderId) {
                const data = singleCartData.data.data

                let totalPriceItem =
                  (data.product.price * (100 - data.product.discount) * data.amount) / 100

                if (order.voucher) {
                  if (order.voucher.type === 0) {
                    totalPriceItem = (totalPriceItem * (100 - order.voucher.discount.percent)) / 100
                  } else {
                    totalPriceItem = totalPriceItem - order.voucher.discount.price
                  }
                }

                return { ...order, ...singleCartData.data.data, totalPriceItem }
              }
              return order
            })
          )
        }
      }
    }
  })
}

export const useCheckoutMutation = () => {
  useAxiosPrivate()
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<BaseResponse>,
    AxiosError<IErrorResponse<string[]>>,
    IProductOrdered[]
  >({
    mutationFn: (data) => orderServices.checkoutCart(data),
    onSuccess(data) {
      toast.success(data.data.message)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.order.briefList, { status: -1, size: BRIEF_CART_SIZE }]
      })

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.order.list, { size: CART_SIZE, status: -1 }],
        refetchType: 'none'
      })

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.order.complete, { size: SIZE, status: 1 }],
        refetchType: 'none'
      })
    },
    onError(error) {
      const productsCartData: IProductSelected[] | undefined = authUtils.getItem(AUTH.CART_CHECKOUT)

      const invalidOrder = error.response?.data.errors

      const updateProductsCartPersisted =
        productsCartData?.filter((item) => !invalidOrder?.includes(item._id)) || []

      authUtils.setItem(AUTH.CART_CHECKOUT, updateProductsCartPersisted)

      toast.error(error.response?.data.message)
    }
  })
}
