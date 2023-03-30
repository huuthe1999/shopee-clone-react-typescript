import { TCredentialFormRequest } from '@/components/form/validate'
import { UserResponse } from '@/types/credential-form/user.type'

import { BaseResponse } from '../base.response'

export interface LoginSuccessResponse extends BaseResponse {
  data: {
    accessToken: string
    expiresIn: number
    user: UserResponse
  }
}

export interface LoginErrorResponse extends BaseResponse {
  errors?: Array<{ [key in keyof TCredentialFormRequest]: string }>
}
