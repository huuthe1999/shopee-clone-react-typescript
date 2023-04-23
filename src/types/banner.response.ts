import { BaseResponse } from './base.response'

export interface CateCardBannerSuccessResponse extends BaseResponse {
  data: {
    items: CateCardBanner[]
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
}

export interface CateCardBanner {
  _id: string
  image: string
  text: string
}
