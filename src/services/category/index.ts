import httpAxios from '@/config/http'
import { ENDPOINTS } from '@/constants'
import { ICategoryResponse } from '@/types'

interface Params {
  page: number
  size: number
}
export const getCategories = (signal?: AbortSignal, params?: Params) =>
  httpAxios.get<ICategoryResponse>(ENDPOINTS.CATEGORY_END_POINT, {
    signal,
    params
  })
