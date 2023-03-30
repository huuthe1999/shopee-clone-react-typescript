import './App.css'

import React from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Spinner } from '@/components/spinner'
import { PATHS } from '@/constants'

const HomePage = React.lazy(() => import('@/pages/Home'))
const CredentialPage = React.lazy(() => import('@/pages/Credential'))
const GuestLayout = React.lazy(() => import('@/layouts/Guest'))

function App() {
  const router = createBrowserRouter([
    {
      path: PATHS.HOME_PATH,
      element: <HomePage />
    },
    {
      element: <GuestLayout />,
      children: [
        {
          path: PATHS.LOGIN_PATH,
          element: <CredentialPage />
        },
        {
          path: PATHS.REGISTER_PATH,
          element: <CredentialPage />
        }
      ]
    },
    { path: PATHS.NOTFOUND_PATH, element: <h1>404 Not Found page</h1> }
  ])

  return (
    <div className="h-screen">
      <React.Suspense fallback={<Spinner />}>
        <RouterProvider router={router} />
      </React.Suspense>
    </div>
  )
}

export default App
