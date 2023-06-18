import React from 'react'

interface AuthProviderProps {
  children: React.ReactNode
}

const useAuth = () => {
  const [accessToken, setAccessToken] = React.useState<string>(null!)

  const handleSetAccessToken = React.useCallback((token: string) => {
    setAccessToken(token)
  }, [])

  const handleResetAuth = React.useCallback(() => {
    setAccessToken(null!)
  }, [])

  const contextValue = React.useMemo(
    () => ({
      accessToken,
      handleSetAccessToken,
      handleResetAuth
    }),
    [accessToken, handleSetAccessToken, handleResetAuth]
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
