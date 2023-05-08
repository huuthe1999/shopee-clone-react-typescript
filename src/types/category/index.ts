import { BaseResponse, IBaseDataPagination } from '../base.response'

export type OrderType = 'asc' | 'desc' | ''
export type SortByType = 'popular' | 'newest' | 'sales' | 'price'

export interface ICategoryResponse extends BaseResponse {
  data: IBaseDataPagination<ICategory>
}

export interface ICategory {
  _id: string
  name: string
  active: boolean
  image: string
  user: string
  slug: string
  createdAt: string
  updatedAt: string
}
