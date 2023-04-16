import React from 'react'

import { LoginDataResponse, UserResponse } from '@/types/credential-form'

interface AuthProviderProps {
  children: React.ReactNode
}

const useAuth = () => {
  const [currentUser, setCurrentUser] = React.useState<Pick<LoginDataResponse, 'user'>>(null!)
  const [accessToken, setAccessToken] = React.useState<string>(null!)

  const handleSetUser = React.useCallback((data: UserResponse) => {
    setCurrentUser((prev) => ({ ...prev, ...data }))
  }, [])

  const handleSetAccessToken = React.useCallback((token: string) => {
    setAccessToken(token)
  }, [])

  const handleResetAuth = React.useCallback(() => {
    setAccessToken(null!)
    setCurrentUser(null!)
  }, [])

  const contextValue = React.useMemo(
    () => ({
      currentUser,
      accessToken,
      handleSetUser,
      handleSetAccessToken,
      handleResetAuth
    }),
    [currentUser, accessToken, handleSetUser, handleSetAccessToken, handleResetAuth]
  )

  return contextValue
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
