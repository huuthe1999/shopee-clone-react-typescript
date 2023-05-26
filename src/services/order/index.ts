import { AxiosResponse } from 'axios'

import { authAxios } from '@/config/http'
import { ENDPOINTS } from '@/constants'
import { OrderQueryProps } from '@/hooks'
import { BaseResponse, ICart, ICartResponse } from '@/types'

export interface AddToCartProps {
  amount: number
  productId: string
  brief_product: Omit<ICart['brief_product'], '_id'>
}

export const addToCart = ({ amount, productId, brief_product }: AddToCartProps) =>
  authAxios.post<BaseResponse, AxiosResponse<BaseResponse>, AddToCartProps>(
    ENDPOINTS.ORDER_END_POINT,
    { amount, productId, brief_product }
  )

export const getInCart = (props: OrderQueryProps) =>
  authAxios.get<ICartResponse, AxiosResponse<ICartResponse>>(ENDPOINTS.ORDER_END_POINT, {
    params: { ...props }
  })
