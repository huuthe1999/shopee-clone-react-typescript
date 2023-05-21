import { BaseResponse, CateCardBanner, IBaseDataPagination, IBaseItem, IFile } from '@/types'

export type OrderType = 'asc' | 'desc' | ''
export type SortByType = 'popular' | 'newest' | 'sales' | 'price'

export interface ICategoryResponse extends BaseResponse {
  data: IBaseDataPagination<ICategory[]>
}

export interface ISubCategoryResponse extends BaseResponse {
  data: Pick<ICategory, 'subCategories'>
}

export interface ICategory extends IBaseItem {
  isActive: boolean
  images: IFile[]
  slug: string
  subCategories: IBaseItem[]
  createdAt: string
  updatedAt: string
}

export function isCategoryResponse(data: ICategory | CateCardBanner): data is ICategory {
  return (data as ICategory).subCategories !== undefined
}
