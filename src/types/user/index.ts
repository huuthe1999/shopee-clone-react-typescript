import { BaseResponse, UserResponse } from '@/types'

export interface IProfileSuccessResponse extends BaseResponse {
  data: UserResponse
}
