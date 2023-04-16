import { useQuery } from '@tanstack/react-query'

import { ENDPOINTS } from '@/constants'
import { useAuthContext } from '@/contexts'
import { useAxiosPrivate } from '@/hooks'
import { ProfileSuccessResponse } from '@/types/user.response'

const useProfileQuery = () => {
  const { accessToken } = useAuthContext()
  const axiosPrivate = useAxiosPrivate()

  return useQuery({
    queryKey: [ENDPOINTS.PROFILE_END_POINT],
    queryFn: ({ signal }) => {
      return axiosPrivate.get<ProfileSuccessResponse>(ENDPOINTS.PROFILE_END_POINT, { signal })
    },
    enabled: !!accessToken,
    staleTime: Infinity
  })
}

// interface Props {
//   queryKey?: (string | number)[]
//   query?: Record<string, any>
// }

// const useProfileQuery = ({ queryKey, query }: Props = {}) => {
//   const { accessToken } = useAuthContext()
//   const axiosPrivate = useAxiosPrivate()

//   return useQuery({
//     queryKey: [ENDPOINTS.PROFILE_END_POINT, ...(queryKey ?? []), query],
//     queryFn: ({ signal }) => {
//       const queryString = query ? qs.stringify(query) : ''
//       const url = `${ENDPOINTS.PROFILE_END_POINT}${queryString ? `?${queryString}` : ''}`
//       return axiosPrivate.get<ProfileSuccessResponse>(url, { signal })
//     },
//     enabled: !!accessToken,
//     staleTime: Infinity
//   })
// }

export default useProfileQuery
