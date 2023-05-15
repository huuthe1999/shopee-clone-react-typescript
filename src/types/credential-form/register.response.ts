import { BaseResponse, UserResponse } from '@/types'

export interface RegisterSuccessResponse extends BaseResponse {
  data: {
    user: UserResponse
  }
}
