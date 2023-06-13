import httpAxios, { authAxios } from '@/config/http'
import { ENDPOINTS } from '@/constants'
import { BaseResponse, IAddress, IDataResponse, IDistrict, IProvince, IWard } from '@/types'

export const getProvinces = () =>
  httpAxios.get<IDataResponse<Array<IProvince>>>(ENDPOINTS.PROVINCE_END_POINT)

export const getDistricts = (provinceId: string) =>
  httpAxios.get<IDataResponse<Array<IDistrict>>>(ENDPOINTS.DISTRICT_END_POINT, {
    params: {
      provinceId
    }
  })

export const getWards = (districtId: string) =>
  httpAxios.get<IDataResponse<Array<IWard>>>(ENDPOINTS.WARD_END_POINT, {
    params: { districtId }
  })

export const createAddress = (data: Omit<IAddress, '_id'>) =>
  authAxios.post<IDataResponse<IAddress>>(ENDPOINTS.ADDRESS_END_POINT, data)

export const setDefaultAddress = (id: string) =>
  authAxios.patch<BaseResponse>(`${ENDPOINTS.ADDRESS_END_POINT}/${id}`)

export const getAddresses = () =>
  authAxios.get<IDataResponse<IAddress[]>>(ENDPOINTS.ADDRESS_END_POINT)
