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
            return {
              ...oldData,
              data: {
                ...oldData.data,
                data: [data.data.data, ...oldData.data.data]
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

export const useSetDefaultAddressMutation = () => {
  useAxiosPrivate()
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<BaseResponse>,
    AxiosError<BaseErrorResponse<Pick<IAddress, '_id'>>>,
    Pick<IAddress, '_id'>
  >({
    mutationFn: ({ _id }) => addressServices.setDefaultAddress(_id),
    onSuccess(data, { _id }) {
      queryClient.setQueryData<AxiosResponse<IDataResponse<IAddress[]>>>(
        [QUERY_KEYS.address.list],

        (oldData) => {
          if (oldData) {
            const newData = oldData.data.data.slice().map((address) => ({
              ...address,
              isSelected: _id === address._id ? true : false
            }))

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
