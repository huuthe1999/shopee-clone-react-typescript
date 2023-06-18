import { useEffect, useRef } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse, HttpStatusCode, isAxiosError } from 'axios'
import { toast } from 'react-toastify'

import { authAxios } from '@/config/http'
import { ISSERVER } from '@/constants'
import { useAuthContext } from '@/contexts'
import { authServices } from '@/services'
import { BaseResponse, RefreshTokenSuccessResponse } from '@/types'
import { authUtils } from '@/utils'

function useAxiosPrivate() {
  const queryClient = useQueryClient()
  const isRefreshTokenExpired = useRef(true) // Chỉ toast 1 lần duy nhất khi RefreshToken hết hạn
  const refreshingToken = useRef<Promise<AxiosResponse<RefreshTokenSuccessResponse>> | null>(null)
  // const refresh = useRefreshToken()
  const { accessToken, handleSetAccessToken, handleResetAuth } = useAuthContext()

  useEffect(() => {
    const requestInterceptor = authAxios.interceptors.request.use(
      (config) => {
        if (!ISSERVER && !config.headers.Authorization) {
          config.headers = config.headers || {}
          config.headers.Authorization = `Bearer ${accessToken}`
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    const responseInterceptor = authAxios.interceptors.response.use(
      (response) => {
        return response
      },
      async (error: AxiosError<BaseResponse>) => {
        // Lấy lại config mà request failed
        const originalRequest = error.config

        // Kiểm tra xem đây có phải lỗi do access token hết hạn hay không?
        if (
          error.response?.status === HttpStatusCode.Unauthorized &&
          originalRequest &&
          !originalRequest.isRetryAttempt &&
          error.response?.data.message === 'TOKEN_EXPIRED'
        ) {
          // Đánh dấu đã có request gọi để lấy lại token
          originalRequest.isRetryAttempt = true
          try {
            // Gọi refresh token để lấy lại access token mới
            refreshingToken.current = refreshingToken.current
              ? refreshingToken.current
              : authServices.getRefreshToken()
            const { data } = await refreshingToken.current
            // Set lại AccessToken
            handleSetAccessToken(data.data.accessToken)
            // Set lại Header
            originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`

            // Set lại refreshingToken = null cho những lần expired tiếp theo
            refreshingToken.current = null
            return authAxios(originalRequest)
          } catch (err) {
            if (isAxiosError<BaseResponse>(err) && isRefreshTokenExpired.current) {
              // Reset context
              authUtils.clearAll()
              handleResetAuth()

              queryClient.clear()

              isRefreshTokenExpired.current = false
              // Xử lí refresh token hết hạn, cho log out, auto redirect về trang login được set trong protected route
              toast.info(err.response?.data.message)
            }
            // return Promise.reject(error)
          }
        }
        return Promise.reject(error)
      }
    )

    return () => {
      authAxios.interceptors.request.eject(requestInterceptor)
      authAxios.interceptors.response.eject(responseInterceptor)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken])

  return authAxios
}

export default useAxiosPrivate
