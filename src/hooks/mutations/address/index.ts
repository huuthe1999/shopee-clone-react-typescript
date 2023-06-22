import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

import { QUERY_KEYS } from '@/constants'
import { useAxiosPrivate } from '@/hooks'
import { addressServices } from '@/services'
import { BaseErrorResponse, BaseResponse, IAddress, IDataResponse } from '@/types'

export const useAddressMutation = () => {
  useAxiosPrivate()
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<IDataResponse<IAddress>>,
    AxiosError<BaseErrorResponse<Omit<IAddress, '_id'>>>,
    Omit<IAddress, '_id'>
  >({
    mutationFn: (data) => addressServices.createAddress(data),
    onSuccess(data) {
      toast.success(data.data.message)
      queryClient.setQueryData<AxiosResponse<IDataResponse<IAddress[]>>>(
        [QUERY_KEYS.address.list],

        (oldData) => {
          if (oldData) {
            if (!oldData.data.data.length) {
              return {
                ...oldData,
                data: {
                  ...oldData.data,
                  data: [data.data.data, ...oldData.data.data]
                }
              }
            }
            return {
              ...oldData,
              data: {
                ...oldData.data,
                data: [oldData.data.data[0], data.data.data, ...oldData.data.data.slice(1)]
              }
            }
          }

          return oldData
        }
      )
      // queryClient.invalidateQueries({
      //   queryKey: [QUERY_KEYS.address.list]
      // })
    },
    onError(error) {
      toast.error(error.response?.data.message)
    }
  })
}

export const useUpdateAddressMutation = () => {
  useAxiosPrivate()
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<BaseResponse>,
    AxiosError<BaseResponse>,
    IAddress & { actionType: 0 | 1 }
  >({
    mutationFn: ({ actionType, ...data }) =>
      actionType === 0
        ? addressServices.updateAddress(data)
        : addressServices.deleteAddress(data._id),
    onSuccess(data, { actionType, ...variables }) {
      toast.success(data.data.message)
      if (actionType === 0) {
        queryClient.setQueryData<AxiosResponse<IDataResponse<IAddress[]>>>(
          [QUERY_KEYS.address.list],

          (oldData) => {
            if (oldData) {
              const newData = oldData.data.data.slice()

              const oldAddressIndex = newData.findIndex((address) => address._id === variables._id)

              if (oldAddressIndex !== -1) {
                newData.splice(oldAddressIndex, 1, { ...newData[oldAddressIndex], ...variables })

                return {
                  ...oldData,
                  data: {
                    ...oldData.data,
                    data: newData
                  }
                }
              }
            }

            return oldData
          }
        )
      } else {
        queryClient.setQueryData<AxiosResponse<IDataResponse<IAddress[]>>>(
          [QUERY_KEYS.address.list],

          (oldData) => {
            if (oldData) {
              const newData = oldData.data.data.slice()

              const oldAddressIndex = newData.findIndex((address) => address._id === variables._id)

              if (oldAddressIndex !== -1) {
                newData.splice(oldAddressIndex, 1)

                return {
                  ...oldData,
                  data: {
                    ...oldData.data,
                    data: newData
                  }
                }
              }
            }

            return oldData
          }
        )
      }

      // queryClient.invalidateQueries({
      //   queryKey: [QUERY_KEYS.address.list]
      // })
    },
    onError(error) {
      toast.error(error.response?.data.message)
    }
  })
}

export const useSetDefaultOrSelectedAddressMutation = () => {
  useAxiosPrivate()
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<BaseResponse>,
    AxiosError<BaseErrorResponse<Pick<IAddress, '_id'>>>,
    { id: string; type: 0 | 1 }
  >({
    mutationFn: (data) => addressServices.setDefaultOrSelectedAddress(data),
    onSuccess(data, { id, type }) {
      toast.success(data.data.message)
      queryClient.setQueryData<AxiosResponse<IDataResponse<IAddress[]>>>(
        [QUERY_KEYS.address.list],

        (oldData) => {
          if (oldData) {
            const newData = oldData.data.data.slice().map((address) => {
              return type === 0
                ? {
                    ...address,
                    isDefault: id === address._id ? true : false
                  }
                : {
                    ...address,
                    isSelected: id === address._id ? true : false
                  }
            })

            return {
              ...oldData,
              data: {
                ...oldData.data,
                data: newData
              }
            }
          }

          return oldData
        }
      )
    },
    onError(error) {
      toast.error(error.response?.data.message)
    }
  })
}
