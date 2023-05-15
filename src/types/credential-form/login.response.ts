import { BaseResponse, UserResponse } from '@/types'

export interface LoginSuccessResponse extends BaseResponse {
  data: LoginDataResponse
}

export interface LoginDataResponse {
  accessToken: string
  expiresIn: number
  user: UserResponse
}
