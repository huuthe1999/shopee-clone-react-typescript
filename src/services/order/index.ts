import { AxiosResponse } from 'axios'

import { authAxios } from '@/config/http'
import { ENDPOINTS } from '@/constants'
import { OrderQueryProps } from '@/hooks'
import { BaseResponse, ICart, IDataPaginationResponse, IDataResponse } from '@/types'

export interface AddToCartProps {
  amount: number
  productId: string
}

export type BaseCartProps = { actionType: 0 | 1 }

export type UpdateCartProps = { orderId: string } & AddToCartProps

export type DeleteCartProps = { orderIds: string[] }

export type ModifyCartProps =
  | ({ actionType: 0; orderId: string } & AddToCartProps)
  | { actionType: 1; orderIds: string[] }

export const addToCart = ({ amount, productId }: AddToCartProps) =>
  authAxios.post<BaseResponse, AxiosResponse<BaseResponse>, AddToCartProps>(
    ENDPOINTS.ORDER_END_POINT,
    { amount, productId }
  )

export const updateCart = ({ amount, orderId, productId }: UpdateCartProps) => {
  return authAxios.patch<
    IDataResponse<ICart>,
    AxiosResponse<IDataResponse<ICart>>,
    UpdateCartProps & BaseCartProps
  >(ENDPOINTS.ORDER_END_POINT, { amount, productId, actionType: 0, orderId })
}

export const deleteCart = ({ orderIds }: DeleteCartProps) => {
  return authAxios.patch<
    BaseResponse,
    AxiosResponse<BaseResponse>,
    DeleteCartProps & BaseCartProps
  >(ENDPOINTS.ORDER_END_POINT, { actionType: 1, orderIds })
}

export const getInCart = (props: OrderQueryProps) =>
  authAxios.get<IDataPaginationResponse<ICart[]>, AxiosResponse<IDataPaginationResponse<ICart[]>>>(
    ENDPOINTS.ORDER_END_POINT,
    {
      params: { ...props }
    }
  )

export const checkoutCart = (data: string[]) =>
  authAxios.post<BaseResponse>(ENDPOINTS.ORDER_CHECKOUT_END_POINT, { data })
