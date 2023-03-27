import { lazy } from 'react'

import { useRoutes } from 'react-router-dom'

const HomePage = lazy(() => import('@/pages/Home'))
const LoginPage = lazy(() => import('@/pages/Login'))
const RegisterPage = lazy(() => import('@/pages/Register'))
const GuestLayout = lazy(() => import('@/layouts/Guest'))

const useRouteElements = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <HomePage />
    },
    {
      element: <GuestLayout />,
      children: [
        {
          path: '/login',
          element: <LoginPage />
        },
        { path: '/register', element: <RegisterPage /> }
      ]
    },
    { path: '*', element: <h1>Error page</h1> }
  ])

  return element
}

export default useRouteElements
