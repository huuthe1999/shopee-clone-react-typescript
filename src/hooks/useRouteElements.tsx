import { lazy } from 'react'

import { useRoutes } from 'react-router-dom'

const HomePage = lazy(() => import('@/pages/Home'))
const CredentialPagePage = lazy(() => import('@/pages/Credential'))
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
          element: <CredentialPagePage />
        },
        { path: '/register', element: <CredentialPagePage /> }
      ]
    },
    { path: '*', element: <h1>Error page</h1> }
  ])

  return element
}

export default useRouteElements
