import { BaseResponse, UserResponse } from '@/types'

export interface ProfileSuccessResponse extends BaseResponse {
  data: UserResponse
}
