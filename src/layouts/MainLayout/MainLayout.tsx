import React from 'react'

import { Outlet, ScrollRestoration } from 'react-router-dom'

import { MyErrorBoundary, Spinner } from '@/components'
import { useRefreshTokenQuery } from '@/hooks'
import { Footer, MainHeader } from '@/layouts'

const MainLayout = () => {
  useRefreshTokenQuery()

  return (
    <>
      <div className="relative flex h-full flex-col">
        <MainHeader />
        <main className="flex-1 bg-neutral-100 p-2 max-sm:p-0">
          <MyErrorBoundary>
            <React.Suspense fallback={<Spinner />}>
              <Outlet />
            </React.Suspense>
          </MyErrorBoundary>
        </main>
        <Footer />
        <ScrollRestoration />
      </div>
    </>
  )
}

export default MainLayout
