import { FieldValues } from 'react-hook-form'
export interface BaseResponse {
  isSuccess: boolean
  message: string
}

export interface BaseErrorResponse<TFields extends FieldValues> extends BaseResponse {
  errors?: Array<{ [key in keyof TFields]: string }>
}

export interface IBaseDataPagination<T> {
  items: Array<T>
  totalItems: number
  offset: number
  perPage: number
  totalPages: number
  currentPage: number
  prevPage: number | null
  nextPage: number | null
  hasPrevPage: boolean
  hasNextPage: boolean
  pagingCounter: number
}
