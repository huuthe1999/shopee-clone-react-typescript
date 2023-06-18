import React, { useMemo } from 'react'

import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import { MyErrorBoundary, Spinner } from '@/components'
import { PATHS } from '@/constants'
import { AuthProvider, ProtectedRoute, RejectedRoute } from '@/contexts'

const HomePage = React.lazy(() => import('@/pages/Home'))
const CredentialPage = React.lazy(() => import('@/pages/Credential'))
const GuestLayout = React.lazy(() => import('@/layouts/GuestLayout'))
const MainLayout = React.lazy(() => import('@/layouts/MainLayout'))
const CartPage = React.lazy(() => import('@/pages/Cart'))
const CheckOutPage = React.lazy(() => import('@/pages/CheckOut'))
const CheckOutSuccessPage = React.lazy(() => import('@/pages/CheckOutSuccess'))
const CategoryPage = React.lazy(() => import('@/pages/Category'))
const ProductDetailPage = React.lazy(() => import('@/pages/ProductDetail'))
const UserPage = React.lazy(() => import('@/pages/User'))
const UserProfilePage = React.lazy(() => import('@/pages/User/UserProfile'))
const UserAddressPage = React.lazy(() => import('@/pages/User/UserAddress'))
const UserPasswordPage = React.lazy(() => import('@/pages/User/UserPassword'))
const UserPurchasePage = React.lazy(() => import('@/pages/User/UserPurchase'))
const NotFoundPage = React.lazy(() => import('@/pages/NotFound'))

const RouterElementProvider = () => {
  const router = useMemo(
    () =>
      createBrowserRouter([
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
                },
                {
                  path: PATHS.CHECKOUT_PATH,
                  element: <CheckOutPage />
                },
                {
                  path: PATHS.CHECKOUT_SUCCESS_PATH,
                  element: <CheckOutSuccessPage />
                },
                {
                  path: PATHS.USER_PATH,
                  element: <UserPage />,
                  children: [
                    {
                      path: PATHS.USER_PROFILE_PATH,
                      element: <UserProfilePage />,
                      index: true
                    },
                    {
                      path: PATHS.USER_ADDRESS_PATH,
                      element: <UserAddressPage />
                    },
                    {
                      path: PATHS.USER_PASSWORD_PATH,
                      element: <UserPasswordPage />
                    },
                    {
                      path: PATHS.USER_PURCHASE_PATH,
                      element: <UserPurchasePage />
                    },
                    {
                      path: PATHS.CATCH_ALL_PATH,
                      element: <Navigate to={PATHS.USER_PROFILE_PATH} replace />
                    }
                  ]
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
        { path: PATHS.NOT_FOUND_PATH, element: <NotFoundPage /> },
        { path: PATHS.CATCH_ALL_PATH, element: <Navigate to={PATHS.NOT_FOUND_PATH} replace /> }
      ]),
    []
  )

  return (
    <AuthProvider>
      <MyErrorBoundary>
        <React.Suspense fallback={<Spinner />}>
          <RouterProvider router={router} />
        </React.Suspense>
      </MyErrorBoundary>
    </AuthProvider>
  )
}

export default RouterElementProvider
