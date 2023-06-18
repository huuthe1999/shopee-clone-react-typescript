import httpAxios from '@/config/http'
import { ENDPOINTS } from '@/constants'
import { ICategory, IDataPaginationResponse, IDataResponse } from '@/types'

export const getCategories = (signal?: AbortSignal, params?: any) =>
  httpAxios.get<IDataPaginationResponse<ICategory[]>>(ENDPOINTS.CATEGORY_END_POINT, {
    signal,
    params
  })

export const getSubCategory = (categoryId: string, params: any = {}) =>
  httpAxios.get<IDataResponse<Pick<ICategory, 'subCategories'>>>(
    `${ENDPOINTS.CATEGORY_END_POINT}/${categoryId}`,
    {
      params
    }
  )
