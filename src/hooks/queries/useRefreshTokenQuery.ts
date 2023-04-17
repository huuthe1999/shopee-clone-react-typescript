import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { AUTH, ENDPOINTS } from '@/constants'
import { useAuthContext } from '@/contexts'
import { authServices } from '@/services'
import { BaseResponse } from '@/types'
import { authUtils } from '@/utils'

const useRefreshTokenQuery = () => {
  const isLogging = authUtils.getItem(AUTH.IS_LOGGING)
  const { accessToken, handleSetAccessToken, handleResetAuth } = useAuthContext()
  return useQuery({
    queryKey: [ENDPOINTS.REFRESH_END_POINT],
    queryFn: authServices.getRefreshToken,
    enabled: Boolean(isLogging) && isLogging === 'true' && !accessToken,
    onSuccess({ data }) {
      handleSetAccessToken(data.data.accessToken)
    },
    onError(err: AxiosError<BaseResponse>) {
      handleResetAuth()
      authUtils.removeItem(AUTH.IS_LOGGING)
      toast.info(err.response?.data.message)
    }
  })
}

export default useRefreshTokenQuery
