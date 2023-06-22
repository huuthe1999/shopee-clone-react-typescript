import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useMatch } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AUTH, PATHS, QUERY_KEYS } from '@/constants'
import { useAuthContext } from '@/contexts'
import { authServices } from '@/services'
import { BaseResponse } from '@/types'
import { authUtils } from '@/utils'

// Gọi lấy lại new access token khi page reload, vẫn còn trong status logging
const useRefreshTokenQuery = () => {
  const matchNotFound = useMatch(PATHS.NOT_FOUND_PATH)
  const isLogging = authUtils.getItem(AUTH.IS_LOGGING)

  const { accessToken, handleSetAccessToken, handleResetAuth } = useAuthContext()

  return useQuery({
    queryKey: [QUERY_KEYS.refreshToken],
    queryFn: authServices.getRefreshToken,
    enabled: Boolean(isLogging) && !accessToken && !matchNotFound,
    onSuccess({ data }) {
      if (data.isSuccess) {
        handleSetAccessToken(data.data.accessToken)
      } else {
        handleResetAuth()
        authUtils.removeItem(AUTH.IS_LOGGING)
        toast.info(data.message)
      }
    },
    onError(err: AxiosError<BaseResponse>) {
      handleResetAuth()
      authUtils.removeItem(AUTH.IS_LOGGING)
      toast.info(err.response?.data.message)
    }
  })
}

export default useRefreshTokenQuery
