import React from 'react'

import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'

import { MyErrorBoundary, Spinner } from '@/components'
import { AUTH, ENDPOINTS } from '@/constants'
import { useAuthContext } from '@/contexts'
import { Footer, MainHeader } from '@/layouts'
import { authServices } from '@/services'
import { BaseResponse } from '@/types'
import { authUtils } from '@/utils'

const MainLayout = () => {
  const isLogging = authUtils.getItem(AUTH.IS_LOGGING)
  const { accessToken, handleSetAccessToken } = useAuthContext()
  useQuery({
    queryKey: [ENDPOINTS.REFRESH_END_POINT],
    queryFn: authServices.getRefreshToken,
    enabled: !!isLogging && !accessToken,
    onSuccess({ data }) {
      handleSetAccessToken(data.data.accessToken)
    },
    onError(err: AxiosError<BaseResponse>) {
      authUtils.removeItem(AUTH.IS_LOGGING)
      toast.info(err.response?.data.message)
    }
  })
  return (
    <>
      <div className="flex flex-col h-full">
        <MainHeader />
        <div className="flex-1">
          <MyErrorBoundary>
            <React.Suspense fallback={<Spinner />}>
              <Outlet />
            </React.Suspense>
          </MyErrorBoundary>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default MainLayout
