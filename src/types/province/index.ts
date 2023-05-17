import { BaseResponse, IBaseItem } from '@/types'

export interface IProvinceResponse extends BaseResponse {
  data: Array<IProvince>
}

export interface IProvince extends IBaseItem {
  idProvince: string
  createdAt: string
  updatedAt: string
}
