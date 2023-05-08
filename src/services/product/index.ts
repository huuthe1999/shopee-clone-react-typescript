import httpAxios from '@/config/http'
import { ENDPOINTS, SIZE } from '@/constants'
import { IProductResponse } from '@/types'

export const getDailyProducts = (signal?: AbortSignal, page?: number, size?: number) =>
  httpAxios.get<IProductResponse>(ENDPOINTS.PRODUCT_END_POINT, {
    signal,
    params: {
      page,
      size: size ?? SIZE
    }
  })

export const getProducts = (signal?: AbortSignal, params?: any) =>
  httpAxios.get<IProductResponse>(ENDPOINTS.PRODUCT_END_POINT, {
    signal,
    params
  })
