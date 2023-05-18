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
              className="mx-auto grid max-w-6xl auto-cols-fr grid-flow-col grid-cols-2 gap-4 p-8 max-md:grid-flow-row">
              <div className="col-span-7 h-auto">
                <ErrorBoundaryIcon />
              </div>
              <div className="col-span-5 my-auto flex flex-col gap-3 overflow-x-auto p-8 text-center max-md:col-span-7">
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
                    className="mx-auto w-auto rounded-2xl bg-primary px-4 py-2 text-white transition-all ease-in-out hover:scale-105 hover:bg-orange-500">
                    Thử lại
                  </button>
                  <Link
                    to={PATHS.HOME_PATH}
                    className="mx-auto w-auto rounded-2xl bg-primary px-4 py-2 text-white transition-all ease-in-out hover:scale-105 hover:bg-orange-500">
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
