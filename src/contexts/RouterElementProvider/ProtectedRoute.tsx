import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { PATHS } from '@/constants'
import { useAuthContext } from '@/contexts'

const ProtectedRoute = () => {
  const { accessToken } = useAuthContext()
  const location = useLocation()

  return accessToken ? (
    <Outlet />
  ) : (
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    <Navigate to={PATHS.LOGIN_PATH} state={{ from: location }} replace />
  )
}

export default ProtectedRoute
