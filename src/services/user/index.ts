import { authAxios } from '@/config/http'
import { ENDPOINTS } from '@/constants'
import { IDataResponse, UserResponse } from '@/types'

export const getProfile = (signal?: AbortSignal) =>
  authAxios.get<IDataResponse<UserResponse>>(ENDPOINTS.PROFILE_END_POINT, { signal })
