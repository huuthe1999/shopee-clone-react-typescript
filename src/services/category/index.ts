import httpAxios from '@/config/http'
import { ENDPOINTS } from '@/constants'
import { Params } from '@/services'
import { ICategoryResponse } from '@/types'

export const getCategories = (signal?: AbortSignal, params?: Params) =>
  httpAxios.get<ICategoryResponse>(ENDPOINTS.CATEGORY_END_POINT, {
    signal,
    params
  })
