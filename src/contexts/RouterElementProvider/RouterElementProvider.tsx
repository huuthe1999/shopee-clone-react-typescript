import React from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
const HomePage = React.lazy(() => import('@/pages/Home'))
const CredentialPage = React.lazy(() => import('@/pages/Credential'))
const GuestLayout = React.lazy(() => import('@/layouts/GuestLayout'))
const MainLayout = React.lazy(() => import('@/layouts/MainLayout'))
const CartPage = React.lazy(() => import('@/pages/Cart'))

import { Spinner } from '@/components'
import { PATHS } from '@/constants'
import { AuthProvider, ProtectedRoute, RejectedRoute } from '@/contexts'

const RouterElementProvider = () => {
  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      children: [
        {
          path: PATHS.HOME_PATH,
          element: <HomePage />,
          index: true
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: PATHS.CART_PATH,
              element: <CartPage />
            }
          ]
        }
      ]
    },
    {
      element: <GuestLayout />,
      children: [
        {
          element: <RejectedRoute />,
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
        }
      ]
    },
    { path: PATHS.NOTFOUND_PATH, element: <h1>404 Not Found page</h1> }
  ])
  return (
    <AuthProvider>
      <React.Suspense fallback={<Spinner />}>
        <RouterProvider router={router} />
      </React.Suspense>
    </AuthProvider>
  )
}

export default RouterElementProvider
