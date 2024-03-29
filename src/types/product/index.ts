import { IBaseItem, IFile, IProvince } from '@/types'

export type TVoucher =
  | {
      type: 0
      discount: {
        percent: number
      }
      _id: string
    }
  | {
      type: 1
      discount: {
        price: number
      }
      _id: string
    }
export interface IProduct extends IBaseItem {
  isActive: boolean
  image: string
  images: IFile[]
  categorySlug: string
  categoryId: string
  subCategory: string
  price: number
  quantity: number
  rating: number
  discount: number
  province: IProvince
  // 0:Giảm giá % - 1:Giảm x
  vouchers: Array<TVoucher>
  shipping: number[]
  shopType: number
  status: number
  sold: number
  viewed: number
  slug: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface ISingleProduct
  extends Omit<IProduct, 'categorySlug' | 'subCategory' | 'categoryId'> {
  category: IBaseItem & {
    slug: string
  }
  subCategory: IBaseItem
}
