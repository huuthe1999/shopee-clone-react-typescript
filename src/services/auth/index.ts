import { TCredentialForm } from '@/components/FormCredential/validate'
import httpAxios from '@/config/http'
import { ENDPOINTS } from '@/constants'
import {
  BaseResponse,
  IDataResponse,
  LoginDataResponse,
  RefreshTokenSuccessResponse
} from '@/types'

export const loginUser = (data: TCredentialForm) => {
  return httpAxios.post<IDataResponse<LoginDataResponse>>(ENDPOINTS.LOGIN_END_POINT, data, {
    withCredentials: true
  })
}

export const registerUser = (data: TCredentialForm) => {
  return httpAxios.post<IDataResponse<Pick<LoginDataResponse, 'user'>>>(
    ENDPOINTS.REGISTER_END_POINT,
    data
  )
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
