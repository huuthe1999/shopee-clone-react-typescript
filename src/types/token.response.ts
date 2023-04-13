import { BaseResponse } from './base.response'

export interface RefreshTokenSuccessResponse extends BaseResponse {
  data: {
    accessToken: string
  }
}
