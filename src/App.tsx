import './App.css'

import React from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const HomePage = React.lazy(() => import('@/pages/Home'))
const LoginPage = React.lazy(() => import('@/pages/Login'))
const RegisterPage = React.lazy(() => import('@/pages/Register'))
const GuestLayout = React.lazy(() => import('@/layouts/Guest'))

function App() {
  const router = createBrowserRouter([
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
        {
          path: '/register',
          element: <RegisterPage />
        }
      ]
    },
    { path: '*', element: <h1>Error page</h1> }
  ])

  return (
    <div className="h-screen">
      <React.Suspense fallback={<h1>Loading</h1>}>
        <RouterProvider router={router} />
      </React.Suspense>
    </div>
  )
}

export default App
