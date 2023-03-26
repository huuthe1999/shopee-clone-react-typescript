import { useRoutes } from 'react-router-dom'

import { AuthLayout } from '@/layouts/Auth'
import { HomePage } from '@/pages/Home'
import { LoginPage } from '@/pages/Login'
import { RegisterPage } from '@/pages/Register'

const useRouteElements = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/login',
      element: (
        <AuthLayout>
          <LoginPage />
        </AuthLayout>
      )
    },
    {
      path: '/register',
      element: (
        <AuthLayout>
          <RegisterPage />
        </AuthLayout>
      )
    },
    { path: '*', element: <h1>Error page</h1> }
  ])

  return element
}

export default useRouteElements
