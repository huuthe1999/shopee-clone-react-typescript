import React from 'react'

import { Outlet } from 'react-router-dom'

import { Footer } from '@/layouts/Footer'
import { Header } from '@/layouts/Header'

interface HeaderProps {}

const Guest = (props: HeaderProps) => {
  return (
    <>
      <div className="flex flex-col h-full">
        <Header />
        <div className="flex-1">
          <React.Suspense fallback={<h1>Loading Outlet</h1>}>
            <Outlet />
          </React.Suspense>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Guest
