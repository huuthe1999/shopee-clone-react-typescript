import { BaseResponse, IBaseDataPagination } from '@/types/base'

export interface ICartResponse extends BaseResponse {
  data: IBaseDataPagination<ICart[]>
}

//-1:In cart,0:All, 1:Pending, 2:Shipping,3:Shipped,4:Canceled
export type ICartStatus = -1 | 0 | 1 | 2 | 3 | 4

export interface ICart {
  _id: string
  amount: number
  status: ICartStatus
  product: string
  brief_product: {
    name: string
    image: string
    price: number
    _id: string
    categorySlug: string
    productSlug: string
    isActive: boolean
    discount: number
  }
  user: string
  createdAt: string
  updatedAt: string
}
