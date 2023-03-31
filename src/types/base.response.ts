import { FieldValues } from 'react-hook-form'
export interface BaseResponse {
  isSuccess: boolean
  message: string
}

export interface BaseErrorResponse<TFields extends FieldValues> extends BaseResponse {
  errors?: Array<{ [key in keyof TFields]: string }>
}
