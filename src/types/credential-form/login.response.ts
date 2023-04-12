import { UserResponse } from '@/types/credential-form/user.type'

import { BaseResponse } from '../base.response'

export interface LoginSuccessResponse extends BaseResponse {
  data: LoginDataResponse
}

export interface LoginDataResponse {
  accessToken: string
  expiresIn: number
  user: UserResponse
}
