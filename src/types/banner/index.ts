import { BaseResponse, IBaseDataPagination } from '@/types'

export interface CateCardBannerSuccessResponse extends BaseResponse {
  data: IBaseDataPagination<CateCardBanner>
}

export interface CateCardBanner {
  _id: string
  image: string
  text: string
}
