import { TCredentialForm } from '@/components/FormCredential/validate'
import httpService from '@/config/http'
import { ENDPOINTS } from '@/constants'
import { LoginSuccessResponse, RegisterSuccessResponse } from '@/types/credential-form'
import { RefreshTokenSuccessResponse } from '@/types/token.response'

export const loginUser = (data: TCredentialForm) => {
  return httpService.post<LoginSuccessResponse>(ENDPOINTS.LOGIN_END_POINT, data)
}

export const registerUser = (data: TCredentialForm) => {
  return httpService.post<RegisterSuccessResponse>(ENDPOINTS.REGISTER_END_POINT, data)
}

export const getRefreshToken = () => {
  return httpService.get<RefreshTokenSuccessResponse>(ENDPOINTS.REFRESH_END_POINT)
}
