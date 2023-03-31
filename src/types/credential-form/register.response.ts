import { BaseResponse } from '../base.response'

import { UserResponse } from './'

export interface RegisterSuccessResponse extends BaseResponse {
  data: {
    user: UserResponse
  }
}
