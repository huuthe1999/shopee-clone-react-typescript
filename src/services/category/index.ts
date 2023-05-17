import httpAxios from '@/config/http'
import { ENDPOINTS } from '@/constants'
import { ICategoryResponse, ISubCategoryResponse } from '@/types'

export const getCategories = (signal?: AbortSignal, params?: any) =>
  httpAxios.get<ICategoryResponse>(ENDPOINTS.CATEGORY_END_POINT, {
    signal,
    params
  })

export const getSubCategoryBySlug = (
  signal?: AbortSignal,
  categorySlug?: string,
  params: any = {}
) =>
  httpAxios.get<ISubCategoryResponse>(`${ENDPOINTS.CATEGORY_END_POINT}/${categorySlug}`, {
    signal,
    params
  })
