import httpAxios from '@/config/http'
import { ENDPOINTS } from '@/constants'
import { Params } from '@/services'
import { CateCardBanner, IDataPaginationResponse } from '@/types'

export const getCateCardBanner = (signal?: AbortSignal, params?: Params) =>
  httpAxios.get<IDataPaginationResponse<CateCardBanner[]>>(ENDPOINTS.CATE_BANNER_END_POINT, {
    signal,
    params
  })
