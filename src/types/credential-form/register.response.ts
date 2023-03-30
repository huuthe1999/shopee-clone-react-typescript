import { TCredentialFormRequest } from '@/components/form/validate'

import { BaseResponse } from '../base.response'

import { UserResponse } from './'

export interface RegisterSuccessResponse extends BaseResponse {
  data: {
    user: UserResponse
  }
}

export interface RegisterErrorResponse extends BaseResponse {
  errors?: Array<{ [key in keyof TCredentialFormRequest]: string }>
}
