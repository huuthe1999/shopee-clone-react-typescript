import React from 'react'

import { ErrorBoundary } from 'react-error-boundary'
import { Link } from 'react-router-dom'

import { ErrorBoundaryIcon } from '@/components'
import { PATHS } from '@/constants'
interface Props {
  children?: React.ReactNode
}

const MyErrorBoundary = ({ children }: Props) => {
  return (
    <ErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) => {
        return (
          <>
            <div
              role="alert"
              className="max-w-6xl p-8 mx-auto grid grid-flow-col grid-cols-2 gap-4 auto-cols-fr max-md:grid-flow-row">
              <div className="col-span-7 h-auto">
                <ErrorBoundaryIcon />
              </div>
              <div className="max-md:col-span-7 col-span-5 p-8 text-center my-auto flex flex-col gap-3 overflow-x-auto">
                <h1 className="text-5xl font-semibold">Ooops!</h1>
                <h2 className="text-2xl font-medium italic">Something went wrong</h2>
                <pre className="text-red-500">
                  <code>
                    {error.name} - {error.message}
                  </code>
                </pre>
                <div className="flex gap-4">
                  <button
                    onClick={resetErrorBoundary}
                    className="py-2 px-4 transition-all ease-in-out bg-primary rounded-2xl mx-auto w-auto text-white hover:bg-orange-500 hover:scale-105">
                    Thử lại
                  </button>
                  <Link
                    to={PATHS.HOME_PATH}
                    className="py-2 px-4 transition-all ease-in-out bg-primary rounded-2xl mx-auto w-auto text-white hover:bg-orange-500 hover:scale-105">
                    Trang chủ
                  </Link>
                </div>
              </div>
            </div>
          </>
        )
      }}>
      {children}
    </ErrorBoundary>
  )
}

export default MyErrorBoundary
