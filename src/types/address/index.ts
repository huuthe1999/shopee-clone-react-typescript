export interface IBaseAddress {
  _id: string
  name: string
}

export interface IProvince extends IBaseAddress {}

export interface IDistrict extends IBaseAddress {
  provinceId: string
}

export interface IWard extends IBaseAddress {
  districtId: string
}

export interface IAddress extends IBaseAddress {
  isSelected?: boolean
  isDefault?: boolean
  phone: string
  province: IProvince
  district: IDistrict
  ward: IWard
  address: string
}
