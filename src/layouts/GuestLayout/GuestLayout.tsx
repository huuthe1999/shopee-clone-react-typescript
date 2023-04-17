import React from 'react'

import { Outlet } from 'react-router-dom'

import { LayoutForm, MyErrorBoundary, Spinner } from '@/components'
import { useRefreshTokenQuery } from '@/hooks'
import { Footer, Header } from '@/layouts'

const GuestLayout = () => {
  useRefreshTokenQuery()
  return (
    <>
      <div className="flex flex-col h-full">
        <Header />
        <div className="flex-1">
          <MyErrorBoundary>
            <React.Suspense fallback={<Spinner />}>
              <LayoutForm>
                <Outlet />
              </LayoutForm>
            </React.Suspense>
          </MyErrorBoundary>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default GuestLayout
