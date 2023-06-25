import httpAxios from '@/config/http'
import { ENDPOINTS } from '@/constants'
import { Params } from '@/services'
import { ICategory, IDataPaginationResponse, IDataResponse } from '@/types'

export const getCategories = (params?: Params) =>
  httpAxios.get<IDataPaginationResponse<ICategory[]>>(ENDPOINTS.CATEGORY_END_POINT, {
    params
  })

export const getSubCategory = (categoryId: string, params: any = {}) =>
  httpAxios.get<IDataResponse<Pick<ICategory, 'subCategories'>>>(
    `${ENDPOINTS.CATEGORY_END_POINT}/${categoryId}`,
    {
      params
    }
  )
