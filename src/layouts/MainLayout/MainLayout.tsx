import React from 'react'

import { Outlet } from 'react-router-dom'

import { MyErrorBoundary, Spinner } from '@/components'
import { useRefreshTokenQuery } from '@/hooks'
import { Footer, MainHeader } from '@/layouts'

const MainLayout = () => {
  useRefreshTokenQuery()
  return (
    <>
      <div className="relative flex flex-col h-full overflow-auto">
        <MainHeader />
        <div className="flex-1 bg-neutral-100 p-2">
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
