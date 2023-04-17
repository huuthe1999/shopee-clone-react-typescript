import React from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { MyErrorBoundary, Spinner } from '@/components'
import { PATHS } from '@/constants'
import { AuthProvider, ProtectedRoute, RejectedRoute } from '@/contexts'

const HomePage = React.lazy(() => import('@/pages/Home'))
const CredentialPage = React.lazy(() => import('@/pages/Credential'))
const GuestLayout = React.lazy(() => import('@/layouts/GuestLayout'))
const MainLayout = React.lazy(() => import('@/layouts/MainLayout'))
const CartPage = React.lazy(() => import('@/pages/Cart'))

const RouterElementProvider = () => {
  const router = createBrowserRouter([
    {
      element: (
        <MyErrorBoundary>
          <MainLayout />
        </MyErrorBoundary>
      ),
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
      element: (
        <MyErrorBoundary>
          <GuestLayout />
        </MyErrorBoundary>
      ),
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
