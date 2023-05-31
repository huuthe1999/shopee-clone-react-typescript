import { IProduct } from '@/types'
import { BaseResponse, IBaseDataPagination } from '@/types/base'

export interface ICartResponse extends BaseResponse {
  data: IBaseDataPagination<ICart[]>
}

export interface ISingleCartResponse extends BaseResponse {
  data: ICart
}

//-1:In cart,0:All, 1:Pending, 2:Shipping,3:Shipped,4:Canceled
export type ICartStatus = -1 | 0 | 1 | 2 | 3 | 4

export interface ICart {
  _id: string
  amount: number
  status: ICartStatus
  product: Pick<
    IProduct,
    | '_id'
    | 'name'
    | 'image'
    | 'price'
    | 'categorySlug'
    | 'slug'
    | 'isActive'
    | 'discount'
    | 'quantity'
    | 'vouchers'
  >
  user: string
  createdAt: string
  updatedAt: string
}

export function isUpdateCart(
  data: ISingleCartResponse | BaseResponse
): data is ISingleCartResponse {
  return (data as ISingleCartResponse).data !== undefined
}
