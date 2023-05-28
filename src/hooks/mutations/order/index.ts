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
    AxiosError<BaseErrorResponse<Pick<ICart, 'amount' | 'status'>>>,
    orderServices.AddToCartProps
  >({
    mutationFn: ({ amount, productId }) => orderServices.addToCart({ amount, productId }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.order, { status: -1 }] })
    }
  })
}
