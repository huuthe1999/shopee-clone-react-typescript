import { BaseResponse, IBaseDataPagination, IBaseItem, IFile, IProvince } from '@/types'

export interface IProductResponse extends BaseResponse {
  data: IBaseDataPagination<IProduct>
}

export interface IProduct extends IBaseItem {
  isActive: boolean
  images: IFile[]
  categorySlug: string
  price: number
  quantity: number
  rating: number
  discount: number
  province: IProvince
  sold: number
  viewed: number
  slug: string
  description?: string
  createdAt: string
  updatedAt: string
}
