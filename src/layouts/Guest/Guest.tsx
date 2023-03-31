import React from 'react'

import { Outlet } from 'react-router-dom'

import { LayoutForm, MyErrorBoundary, Spinner } from '@/components'
import { Footer } from '@/layouts/Footer'
import { Header } from '@/layouts/Header'

const Guest = () => {
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

export default Guest
