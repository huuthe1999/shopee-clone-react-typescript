import { authAxios } from '@/config/http'
import { ENDPOINTS } from '@/constants'
import { ProfileSuccessResponse } from '@/types/user.response'

export const getProfile = (signal?: AbortSignal) =>
  authAxios.get<ProfileSuccessResponse>(ENDPOINTS.PROFILE_END_POINT, { signal })
