import { authService } from '@/config/http'
import { ENDPOINTS } from '@/constants'
import { ProfileSuccessResponse } from '@/types/user.response'

export const getProfile = (signal?: AbortSignal) => {
  return authService.get<ProfileSuccessResponse>(ENDPOINTS.PROFILE_END_POINT, { signal })
}
