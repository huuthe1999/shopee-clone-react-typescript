import { authAxios } from '@/config/http'
import { ENDPOINTS } from '@/constants'
import { IProfileSuccessResponse } from '@/types'

export const getProfile = (signal?: AbortSignal) =>
  authAxios.get<IProfileSuccessResponse>(ENDPOINTS.PROFILE_END_POINT, { signal })
