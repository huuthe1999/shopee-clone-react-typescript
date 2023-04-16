import { useEffect, useRef } from 'react'

import { AxiosError, AxiosResponse, HttpStatusCode, isAxiosError } from 'axios'
import { toast } from 'react-toastify'

import { authService } from '@/config/http'
import { AUTH, ISSERVER } from '@/constants'
import { useAuthContext } from '@/contexts'
import { authServices } from '@/services'
import { BaseResponse } from '@/types'
import { RefreshTokenSuccessResponse } from '@/types/token.response'
import { authUtils } from '@/utils'

import useRefreshToken from './useRefreshToken'

function useAxiosPrivate() {
  const isRefreshTokenExpired = useRef(true) // Chỉ toast 1 lần duy nhất khi RefreshToken hết hạn
  const refreshingToken = useRef<Promise<AxiosResponse<RefreshTokenSuccessResponse>> | null>(null)
  const refresh = useRefreshToken()
  const { accessToken, handleSetAccessToken, handleSetUser } = useAuthContext()

  useEffect(() => {
    const requestInterceptor = authService.interceptors.request.use(
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

    const responseInterceptor = authService.interceptors.response.use(
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

            // Set lại Header
            originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`

            // Set lại refreshingToken = null cho những lần expired tiếp theo
            refreshingToken.current = null
            return authService(originalRequest)
          } catch (err) {
            if (isAxiosError<BaseResponse>(err) && isRefreshTokenExpired.current) {
              // Reset context
              authUtils.removeItem(AUTH.IS_LOGGING)
              handleSetAccessToken(null!)
              handleSetUser(null!)
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
      authService.interceptors.request.eject(requestInterceptor)
      authService.interceptors.response.eject(responseInterceptor)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, accessToken])

  return authService
}

export default useAxiosPrivate
