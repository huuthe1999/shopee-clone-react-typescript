import httpAxios from '@/config/http'
import { ENDPOINTS } from '@/constants'
import { Params } from '@/services'
import { CateCardBannerSuccessResponse } from '@/types'

export const getCateCardBanner = (signal?: AbortSignal, params?: Params) =>
  httpAxios.get<CateCardBannerSuccessResponse>(ENDPOINTS.CATE_BANNER_END_POINT, {
    signal,
    params
  })
