import React from 'react'

import { Outlet } from 'react-router-dom'

import { MyErrorBoundary, Spinner } from '@/components'
import { Footer, MainHeader } from '@/layouts'

const MainLayout = () => {
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
