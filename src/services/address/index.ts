import { AxiosResponse } from 'axios'

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

export const updateAddress = ({ _id, ...data }: IAddress) =>
  authAxios.put<BaseResponse, AxiosResponse<BaseResponse>, Omit<IAddress, '_id'>>(
    `${ENDPOINTS.ADDRESS_END_POINT}/${_id}`,
    data
  )

export const deleteAddress = (_id: string) =>
  authAxios.delete<BaseResponse, AxiosResponse<BaseResponse>, string>(
    `${ENDPOINTS.ADDRESS_END_POINT}/${_id}`
  )

// type 0: set default - 1: set selected
export const setDefaultOrSelectedAddress = ({ id, type }: { id: string; type: 0 | 1 }) =>
  authAxios.patch<BaseResponse, AxiosResponse<BaseResponse>, { type: 0 | 1 }>(
    `${ENDPOINTS.ADDRESS_END_POINT}/${id}`,
    {
      type
    }
  )

export const getAddresses = () =>
  authAxios.get<IDataResponse<IAddress[]>>(ENDPOINTS.ADDRESS_END_POINT)
