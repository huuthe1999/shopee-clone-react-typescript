import { useQuery } from '@tanstack/react-query'
import { Outlet } from 'react-router-dom'

import { ENDPOINTS } from '@/constants'
import { useAuthContext } from '@/contexts'
import { useAxiosPrivate } from '@/hooks'
import { ProfileSuccessResponse } from '@/types/user.response'

const Home = () => {
  const { accessToken } = useAuthContext()
  const axiosPrivate = useAxiosPrivate()
  const profileQuery = useQuery({
    queryKey: [ENDPOINTS.PROFILE_END_POINT, 1],
    queryFn: ({ signal }) =>
      axiosPrivate.get<ProfileSuccessResponse>(ENDPOINTS.PROFILE_END_POINT, { signal }),
    enabled: !!accessToken,
    cacheTime: 5
  })
  const profileQuery2 = useQuery({
    queryKey: [ENDPOINTS.PROFILE_END_POINT, 2],
    queryFn: ({ signal }) =>
      axiosPrivate.get<ProfileSuccessResponse>(ENDPOINTS.PROFILE_END_POINT, { signal }),
    enabled: !!accessToken,
    cacheTime: 5
  })

  const handleRefetch = () => profileQuery.refetch()
  const handleRefetch2 = () => profileQuery2.refetch()
  return (
    <>
      <div>Home Page</div>
      <button onClick={handleRefetch}>Refetch1</button>
      <button onClick={handleRefetch2}>Refetch2</button>
      <Outlet />
    </>
  )
}

export default Home
