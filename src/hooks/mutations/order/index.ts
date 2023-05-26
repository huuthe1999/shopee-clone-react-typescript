import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

import { QUERY_KEYS } from '@/constants'
import { useAxiosPrivate } from '@/hooks'
import { orderServices } from '@/services'
import { BaseErrorResponse, BaseResponse, ICart } from '@/types'

export const useAddToCartMutation = () => {
  useAxiosPrivate()
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<BaseResponse>,
    AxiosError<BaseErrorResponse<Pick<ICart, 'amount' | 'status' | 'brief_product'>>>,
    orderServices.AddToCartProps
  >({
    mutationFn: ({ amount, productId, brief_product }) =>
      orderServices.addToCart({ amount, productId, brief_product }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.order, { status: -1 }] })
    }
  })
}
