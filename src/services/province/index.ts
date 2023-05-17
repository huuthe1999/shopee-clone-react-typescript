import httpAxios from '@/config/http'
import { ENDPOINTS } from '@/constants'
import { IProvinceResponse } from '@/types'

export const getProvinces = (signal?: AbortSignal) =>
  httpAxios.get<IProvinceResponse>(ENDPOINTS.PROVINCE_END_POINT, {
    signal
  })
