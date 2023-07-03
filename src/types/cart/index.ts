import { IBaseItem, IProduct, TVoucher } from '@/types'

//-1:In cart,0:All, 1:Pending, 2:Shipping,3:Shipped,4:Canceled
export type ICartStatus = -1 | 0 | 1 | 2 | 3 | 4

export interface ICart {
  _id: string
  amount: number
  isStale: boolean
  status: ICartStatus
  product: Pick<
    IProduct,
    | '_id'
    | 'name'
    | 'image'
    | 'price'
    | 'categorySlug'
    | 'categoryId'
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

export interface IProductSelected extends Omit<ICart, 'user'> {
  totalPriceItem?: number
  voucher?: TVoucher
}

export interface IProductOrdered extends Pick<IBaseItem, '_id'> {
  totalPrice: number
  address: string
  voucher?: string
}

export interface ICartCompleted extends IProductOrdered, Pick<ICart, 'amount' | 'status'> {
  updatedAt: string
  product: Pick<IProduct, 'name' | 'image' | 'price' | 'discount' | 'province'>
}

export type TCartCheckOut =
  | {
      status: 'fulfilled'
      value: string
    }
  | { status: 'rejected'; reason: string }
