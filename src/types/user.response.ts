import { BaseResponse } from './base.response'
import { UserResponse } from './credential-form'

export interface ProfileSuccessResponse extends BaseResponse {
  data: UserResponse
}
