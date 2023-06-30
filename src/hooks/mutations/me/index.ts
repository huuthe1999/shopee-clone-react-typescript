import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

import { QUERY_KEYS } from '@/constants'
import { useAuthContext } from '@/contexts'
import { useAxiosPrivate } from '@/hooks'
import { authServices, userServices } from '@/services'
import { BaseResponse, TUserUpdate } from '@/types'
import { authUtils } from '@/utils'
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

export const useLogOut = () => {
  const queryClient = useQueryClient()
  const { handleResetAuth } = useAuthContext()

  return useMutation<AxiosResponse<BaseResponse>>({
    mutationFn: authServices.logoutUser,
    onSuccess({ data }) {
      if (data.isSuccess) {
        //Reset auth
        authUtils.clearAll()
        handleResetAuth()

        queryClient.clear()
        // Toast message
        toast.success(data.message)
      }
    }
  })
}
