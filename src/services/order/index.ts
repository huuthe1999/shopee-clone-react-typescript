import { AxiosResponse } from 'axios'

import { authAxios } from '@/config/http'
import { ENDPOINTS } from '@/constants'
import { OrderQueryProps } from '@/hooks'
import { BaseResponse, ICartResponse, ISingleCartResponse } from '@/types'

export interface AddToCartProps {
  amount: number
  productId: string
}

export type UpdateCartProps =
  | ({ actionType: 0; orderId: string } & AddToCartProps)
  | { actionType: 1; orderId: string }

export const addToCart = ({ amount, productId }: AddToCartProps) =>
  authAxios.post<BaseResponse, AxiosResponse<BaseResponse>, AddToCartProps>(
    ENDPOINTS.ORDER_END_POINT,
    { amount, productId }
  )

export const updateCart = ({ actionType, orderId, ...rest }: UpdateCartProps) => {
  if (actionType === 0) {
    const { amount, productId } = rest as AddToCartProps
    return authAxios.patch<
      ISingleCartResponse,
      AxiosResponse<ISingleCartResponse>,
      UpdateCartProps
    >(ENDPOINTS.ORDER_END_POINT, { amount, productId, actionType, orderId })
  }
  return authAxios.patch<BaseResponse, AxiosResponse<BaseResponse>, UpdateCartProps>(
    ENDPOINTS.ORDER_END_POINT,
    { actionType, orderId }
  )
}

export const getInCart = (props: OrderQueryProps) =>
  authAxios.get<ICartResponse, AxiosResponse<ICartResponse>>(ENDPOINTS.ORDER_END_POINT, {
    params: { ...props }
  })
