import React from 'react'

import { ErrorBoundary } from 'react-error-boundary'

import { ErrorBoundaryIcon } from '@/components'
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
              className="max-w-6xl p-8 mx-auto grid grid-flow-col grid-cols-3 gap-4 auto-cols-fr">
              <div className="col-span-7 h-auto">
                <ErrorBoundaryIcon />
              </div>
              <div className="col-span-5 p-8 text-center my-auto flex flex-col gap-3 overflow-x-auto">
                <h1 className="text-5xl font-semibold">Ooops!</h1>
                <h2 className="text-2xl font-medium italic">Something went wrong</h2>
                <pre className="text-red-500">
                  <code>
                    {error.name} - {error.message}
                  </code>
                </pre>
                <button
                  onClick={resetErrorBoundary}
                  className="py-4 px-8 transition-all ease-in-out bg-primary rounded-2xl mx-auto w-auto text-white hover:bg-orange-500 hover:scale-105">
                  Try again
                </button>
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
