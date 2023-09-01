import React from 'react'

import { Outlet, ScrollRestoration } from 'react-router-dom'

import { MyErrorBoundary, ScrollToTop, Spinner } from '@/components'
import { useRefreshTokenQuery } from '@/hooks'
import { Footer, MainHeader } from '@/layouts'

const MainLayout = () => {
  useRefreshTokenQuery()

  return (
    <>
      <div className="overflow-x-hidden bg-orange-500">
        <div className="animate-marquee whitespace-nowrap py-2">
          <span className="text-xs font-bold text-white/80 sm:text-lg">
            Trang web chỉ phục vụ cho nhu cầu học tập
          </span>
        </div>
      </div>
      <div className="relative flex h-full flex-col">
        <MainHeader />
        <main className="flex-1 p-2 max-sm:p-0">
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
