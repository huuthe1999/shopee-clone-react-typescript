import { useCallback } from 'react'

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
    staleTime: 60 * 1000
  })
}

export const useWardsQuery = (districtId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.address.ward, districtId],
    queryFn: () => addressServices.getWards(districtId as string),
    enabled: !!districtId,
    keepPreviousData: true,
    staleTime: 60 * 1000
  })
}

export const useAddressesQuery = () => {
  return useQuery<AxiosResponse<IDataResponse<IAddress[]>>, AxiosError<BaseResponse>>({
    queryKey: [QUERY_KEYS.address.list],
    queryFn: addressServices.getAddresses,
    select: useCallback((data: AxiosResponse<IDataResponse<IAddress[]>>) => {
      const addresses = data.data.data
      const defaultAddress = addresses.findIndex((address) => address.isDefault)
      if (defaultAddress !== -1) {
        addresses.unshift(addresses.splice(defaultAddress, 1)[0])
        return {
          ...data,
          data: {
            ...data.data,
            data: addresses
          }
        }
      }
      return data
    }, []),
    keepPreviousData: true,
    staleTime: Infinity
  })
  // return {
  //   ...queryInfo,
  //   data: useMemo(
  //     () => ({
  //       ...queryInfo.data,
  //       data: {
  //         ...queryInfo.data?.data,
  //         data: queryInfo.data?.data.data.map((todo) => ({
  //           ...todo,
  //           name: todo.name.toUpperCase()
  //         }))
  //       }
  //     }),
  //     [queryInfo.data]
  //   )
  // }
}
