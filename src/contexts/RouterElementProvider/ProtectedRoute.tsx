import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'

import { PATHS } from '@/constants'
import { useAuthContext } from '@/contexts'

const ProtectedRoute = () => {
  // const isLogging = authUtils.getItem(AUTH.IS_LOGGING)
  const { accessToken } = useAuthContext()
  const navigate = useNavigate()
  const location = useLocation()

  return accessToken ? (
    <Outlet />
  ) : (
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.

    // (startTransition(() => {
    //   navigate(
    //     {
    //       pathname: PATHS.LOGIN_PATH,
    //       search: `${location.search}&callback=${location.pathname}`
    //     },
    //     {
    //       replace: true,
    //       state: { callback: location.pathname + location.search }
    //     }
    //   )
    // }),
    // (
    //   <Navigate
    //     to={{
    //       pathname: PATHS.LOGIN_PATH,
    //       search: `${location.search}&callback=${location.pathname}`
    //     }}
    //     replace={true}
    //   />
    // ))

    <Navigate
      to={{
        pathname: PATHS.LOGIN_PATH,
        search: `${location.search}&callback=${location.pathname}`
      }}
      replace={true}
    />
  )
}

export default ProtectedRoute
