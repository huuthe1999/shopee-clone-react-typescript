import React from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
const HomePage = React.lazy(() => import('@/pages/Home'))
const CredentialPage = React.lazy(() => import('@/pages/Credential'))
const GuestLayout = React.lazy(() => import('@/layouts/GuestLayout'))
const MainLayout = React.lazy(() => import('@/layouts/MainLayout'))

import { Spinner } from '@/components'
import { PATHS } from '@/constants'

const RouterElementProvider = () => {
  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      children: [
        {
          path: PATHS.HOME_PATH,
          element: <HomePage />
        }
      ]
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
    <React.Suspense fallback={<Spinner />}>
      <RouterProvider router={router} />
    </React.Suspense>
  )
}

export default RouterElementProvider
