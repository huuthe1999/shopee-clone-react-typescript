import React, { useMemo } from 'react'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { MyErrorBoundary, Spinner } from '@/components'
import { PATHS } from '@/constants'
import { AuthProvider, ProtectedRoute, RejectedRoute } from '@/contexts'

const HomePage = React.lazy(() => import('@/pages/Home'))
const CredentialPage = React.lazy(() => import('@/pages/Credential'))
const GuestLayout = React.lazy(() => import('@/layouts/GuestLayout'))
const MainLayout = React.lazy(() => import('@/layouts/MainLayout'))
const CartPage = React.lazy(() => import('@/pages/Cart'))
const CheckOutPage = React.lazy(() => import('@/pages/CheckOut'))
const CategoryPage = React.lazy(() => import('@/pages/Category'))
const ProductDetailPage = React.lazy(() => import('@/pages/ProductDetail'))

const RouterElementProvider = () => {
  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          element: (
            <MyErrorBoundary>
              <React.Suspense fallback={<Spinner />}>
                <MainLayout />
              </React.Suspense>
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
                },
                {
                  path: PATHS.CHECKOUT_PATH,
                  element: <CheckOutPage />
                }
              ]
            },
            {
              element: <CategoryPage />,
              path: PATHS.CATEGORY_PATH || PATHS.SEARCH_PATH
            },
            {
              element: <ProductDetailPage />,
              path: PATHS.PRODUCT_DETAIL_PATH
            }
          ]
        },
        {
          element: (
            <MyErrorBoundary>
              <React.Suspense fallback={<Spinner />}>
                <GuestLayout />
              </React.Suspense>
            </MyErrorBoundary>
          ),
          children: [
            {
              element: <RejectedRoute />,
              children: [
                {
                  path: PATHS.LOGIN_PATH || PATHS.REGISTER_PATH,
                  element: <CredentialPage />
                }
              ]
            },
            {
              element: <CategoryPage />,
              path: PATHS.CATEGORY_PATH || PATHS.SEARCH_PATH
            },
            {
              element: <ProductDetailPage />,
              path: PATHS.PRODUCT_DETAIL_PATH
            }
          ]
        },
        { path: PATHS.NOTFOUND_PATH, element: <h1>404 Not Found page</h1> }
      ]),
    []
  )

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default RouterElementProvider
