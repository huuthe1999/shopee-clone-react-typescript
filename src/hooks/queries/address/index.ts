import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

import { QUERY_KEYS } from '@/constants'
import { addressServices } from '@/services'
import { BaseResponse, IAddress, IDataResponse } from '@/types'

export const useProvincesQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.address.province],
    queryFn: addressServices.getProvinces,
    keepPreviousData: true,
    staleTime: Infinity
  })
}

export const useDistrictsQuery = (provinceId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.address.district, provinceId],
    queryFn: () => addressServices.getDistricts(provinceId as string),
    enabled: !!provinceId,
    keepPreviousData: true,
    staleTime: 30 * 1000
  })
}

export const useWardsQuery = (districtId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.address.ward, districtId],
    queryFn: () => addressServices.getWards(districtId as string),
    enabled: !!districtId,
    keepPreviousData: true,
    staleTime: 30 * 1000
  })
}

export const useAddressesQuery = () => {
  return useQuery<AxiosResponse<IDataResponse<IAddress[]>>, AxiosError<BaseResponse>>({
    queryKey: [QUERY_KEYS.address.list],
    queryFn: () => addressServices.getAddresses(),
    keepPreviousData: true,
    staleTime: Infinity
  })
}
