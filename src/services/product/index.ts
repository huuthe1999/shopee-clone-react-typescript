import httpAxios from '@/config/http'
import { ENDPOINTS, SIZE } from '@/constants'
import { IDataPaginationResponse, IDataResponse, IProduct, ISingleProduct } from '@/types'

export const getDailyProducts = (page?: number, size?: number) =>
  httpAxios.get<IDataPaginationResponse<Array<Omit<IProduct, 'images'>>>>(
    ENDPOINTS.PRODUCT_END_POINT,
    {
      params: {
        page,
        size: size ?? SIZE
      }
    }
  )

export const getProducts = (params?: any) =>
  httpAxios.get<IDataPaginationResponse<Array<Omit<IProduct, 'images'>>>>(
    ENDPOINTS.PRODUCT_END_POINT,
    {
      params
    }
  )

export const getProduct = (productId: string) =>
  httpAxios.get<IDataResponse<ISingleProduct>>(`${ENDPOINTS.PRODUCT_END_POINT}/${productId}`)
