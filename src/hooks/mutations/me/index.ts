import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { QUERY_KEYS } from '@/constants'
import { useAxiosPrivate } from '@/hooks'
import { userServices } from '@/services'
import { BaseResponse, TUserUpdate } from '@/types'
export const useUpdateProfile = () => {
  useAxiosPrivate()
  const queryClient = useQueryClient()

  return useMutation<BaseResponse, BaseResponse, TUserUpdate>({
    mutationFn: (data) => userServices.updateProfile(data),
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.profile]
      })
      toast.success(data.message)
    },
    onError(error) {
      toast.error(error.message)
    }
  })
}
