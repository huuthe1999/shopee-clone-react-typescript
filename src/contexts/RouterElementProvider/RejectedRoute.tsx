import { Navigate, Outlet, To, useLocation, useMatch } from 'react-router-dom'

import { PATHS } from '@/constants'
import { useAuthContext } from '@/contexts'

const RejectedRoute = () => {
  const location = useLocation()
  const { accessToken } = useAuthContext()

  const matchLogin = useMatch(PATHS.LOGIN_PATH)

  const to: To = location.state?.from
    ? {
        pathname: location.state?.from?.pathname || PATHS.HOME_PATH,
        search: location.state?.from?.search || ''
      }
    : matchLogin
    ? PATHS.HOME_PATH
    : PATHS.LOGIN_PATH

  // Send them back to the page they tried to visit when they were
  // redirected to the login page. Use { replace: true } so we don't create
  // another entry in the history stack for the login page.  This means that
  // when they get to the protected page and click the back button, they
  // won't end up back on the login page, which is also really nice for the
  // user experience.
  return !accessToken ? <Outlet /> : <Navigate to={to} replace />
}

export default RejectedRoute
