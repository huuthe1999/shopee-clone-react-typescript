import { TCredentialForm } from '@/components/FormCredential/validate'
import httpAxios from '@/config/http'
import { ENDPOINTS } from '@/constants'
import {
  BaseResponse,
  LoginSuccessResponse,
  RefreshTokenSuccessResponse,
  RegisterSuccessResponse
} from '@/types'

export const loginUser = (data: TCredentialForm) => {
  return httpAxios.post<LoginSuccessResponse>(ENDPOINTS.LOGIN_END_POINT, data, {
    withCredentials: true
  })
}

export const registerUser = (data: TCredentialForm) => {
  return httpAxios.post<RegisterSuccessResponse>(ENDPOINTS.REGISTER_END_POINT, data)
}

export const getRefreshToken = () => {
  return httpAxios.get<RefreshTokenSuccessResponse>(ENDPOINTS.REFRESH_END_POINT, {
    withCredentials: true
  })
}

export const logoutUser = () => {
  return httpAxios.post<BaseResponse>(ENDPOINTS.LOGOUT_END_POINT, undefined, {
    withCredentials: true
  })
}
