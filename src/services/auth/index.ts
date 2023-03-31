import { TCredentialFormLogin } from '@/components/Form/validate'
import httpService from '@/config/http'
import { ENDPOINTS } from '@/constants'
import { LoginSuccessResponse } from '@/types/credential-form'

export const loginUser = (data: TCredentialFormLogin) => {
  return httpService.post<LoginSuccessResponse>(ENDPOINTS.LOGIN_END_POINT, data)
}

export const registerUser = (data: TCredentialFormLogin) => {
  return httpService.post<LoginSuccessResponse>(ENDPOINTS.LOGIN_END_POINT, data)
}
