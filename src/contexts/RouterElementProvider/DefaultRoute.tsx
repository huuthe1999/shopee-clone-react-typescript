import { Navigate, Outlet, useLocation, useMatch } from 'react-router-dom'

import { PATHS } from '@/constants'
import { useAuthContext } from '@/contexts'

const DefaultRoute = () => {
  const { accessToken } = useAuthContext()
  const location = useLocation()

  const matchLogin = useMatch(PATHS.LOGIN_PATH)

  const from = location.state?.from?.pathname
    ? location.state.from.pathname
    : matchLogin
    ? PATHS.HOME_PATH
    : PATHS.LOGIN_PATH

  // Send them back to the page they tried to visit when they were
  // redirected to the login page. Use { replace: true } so we don't create
  // another entry in the history stack for the login page.  This means that
  // when they get to the protected page and click the back button, they
  // won't end up back on the login page, which is also really nice for the
  // user experience.
  return !accessToken ? <Outlet /> : <Navigate to={from} replace />
}

export default DefaultRoute
