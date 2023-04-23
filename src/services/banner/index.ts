import httpAxios from '@/config/http'
import { ENDPOINTS } from '@/constants'
import { CateCardBannerSuccessResponse } from '@/types/banner.response'

export const getCateCardBanner = (signal?: AbortSignal, page?: number, size?: number) =>
  httpAxios.get<CateCardBannerSuccessResponse>(ENDPOINTS.CATE_BANNER_END_POINT, {
    signal,
    params: {
      page,
      size
    }
  })
