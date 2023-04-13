import { useAuthContext } from '@/contexts'
import { authServices } from '@/services'

const useRefreshToken = () => {
  const { handleSetAccessToken } = useAuthContext()

  return async () => {
    try {
      const res = await authServices.getRefreshToken()
      handleSetAccessToken(res.data.data.accessToken)
    } catch (error) {
      console.log('🚀 ~ return ~ error:', error)
    }
  }
}

export default useRefreshToken
