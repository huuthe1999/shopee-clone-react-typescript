import React from 'react'

import { LoginDataResponse } from '@/types/credential-form'

interface AuthProviderProps {
  children: React.ReactNode
}

const useAuth = () => {
  const [auth, setAuth] = React.useState<LoginDataResponse>(null!)

  const handleLogin = React.useCallback(
    (data: LoginDataResponse) => setAuth((prev) => ({ ...prev, ...data })),
    [setAuth]
  )

  return { auth, handleLogin }
}

type AuthContextType = ReturnType<typeof useAuth>

const AuthContext = React.createContext<AuthContextType>(null!)

export const useAuthContext = () => {
  const context = React.useContext(AuthContext)
  return context
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export default AuthProvider
