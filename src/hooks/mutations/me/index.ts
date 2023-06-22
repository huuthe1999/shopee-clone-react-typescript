import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { QUERY_KEYS } from '@/constants'
import { useAxiosPrivate } from '@/hooks'
import { userServices } from '@/services'
import { BaseResponse, TUserUpdate } from '@/types'
export const useUpdateProfile = () => {
  useAxiosPrivate()
  const queryClient = useQueryClient()

  return useMutation<BaseResponse, BaseResponse, Partial<TUserUpdate>>({
    mutationFn: (data) => userServices.updateProfile(data),
    onSuccess(data, { password }) {
      toast.success(data.message)
      if (password) {
        return
      }
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.profile]
      })
    },
    onError(error) {
      toast.error(error.message)
    }
  })
}
