import { AxiosResponse } from 'axios'

import { authAxios } from '@/config/http'
import { ENDPOINTS } from '@/constants'
import { OrderQueryProps } from '@/hooks'
import { BaseResponse, ICartResponse } from '@/types'

export interface AddToCartProps {
  amount: number
  productId: string
}

export const addToCart = ({ amount, productId }: AddToCartProps) =>
  authAxios.post<BaseResponse, AxiosResponse<BaseResponse>, AddToCartProps>(
    ENDPOINTS.ORDER_END_POINT,
    { amount, productId }
  )

export const getInCart = (props: OrderQueryProps) =>
  authAxios.get<ICartResponse, AxiosResponse<ICartResponse>>(ENDPOINTS.ORDER_END_POINT, {
    params: { ...props }
  })
