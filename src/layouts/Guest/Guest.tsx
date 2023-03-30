import React from 'react'

import { Outlet } from 'react-router-dom'

import { LayoutForm } from '@/components/form'
import { Spinner } from '@/components/spinner'
import { Footer } from '@/layouts/Footer'
import { Header } from '@/layouts/Header'

const Guest = () => {
  return (
    <>
      <div className="flex flex-col h-full">
        <Header />
        <div className="flex-1">
          <React.Suspense fallback={<Spinner />}>
            <LayoutForm>
              <Outlet />
            </LayoutForm>
          </React.Suspense>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Guest
