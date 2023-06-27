import React from 'react'

import { Outlet, ScrollRestoration } from 'react-router-dom'

import { MyErrorBoundary, ScrollToTop, Spinner } from '@/components'
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
        <ScrollToTop />
        <ScrollRestoration />
      </div>
    </>
  )
}

export default MainLayout
