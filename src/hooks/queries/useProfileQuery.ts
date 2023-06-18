import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants'
import { useAuthContext } from '@/contexts'
import { userServices } from '@/services'

import useAxiosPrivate from '../useAxiosPrivate'

export const useProfileQuery = () => {
  useAxiosPrivate()
  const { accessToken } = useAuthContext()

  return useQuery({
    queryKey: [QUERY_KEYS.profile],
    queryFn: userServices.getProfile,
    keepPreviousData: true,
    enabled: !!accessToken,
    staleTime: Infinity
  })
}
