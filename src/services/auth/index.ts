import { TCredentialFormRequest } from '@/components/form/validate'
import httpService from '@/config/http'
import { ENDPOINTS } from '@/constants'
import { LoginSuccessResponse } from '@/types/credential-form'

export const loginUser = (data: TCredentialFormRequest) => {
  return httpService.post<LoginSuccessResponse>(ENDPOINTS.LOGIN_END_POINT, data)
}
