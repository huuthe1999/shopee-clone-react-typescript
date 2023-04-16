import { useQuery } from '@tanstack/react-query'
import { Outlet } from 'react-router-dom'

import { ENDPOINTS } from '@/constants'
import { useAuthContext } from '@/contexts'
import { useAxiosPrivate, useProfileQuery } from '@/hooks'
import { ProfileSuccessResponse } from '@/types/user.response'

const Home = () => {
  const { accessToken } = useAuthContext()
  const axiosPrivate = useAxiosPrivate()
  const profileQuery = useProfileQuery()
  const profileQuery2 = useQuery({
    queryKey: [ENDPOINTS.PROFILE_END_POINT, 2],
    queryFn: ({ signal }) =>
      axiosPrivate.get<ProfileSuccessResponse>(ENDPOINTS.PROFILE_END_POINT, { signal }),
    enabled: !!accessToken,
    staleTime: Infinity
  })

  const handleRefetch = () => profileQuery.refetch()
  const handleRefetch2 = () => profileQuery2.refetch()
  return (
    <>
      <div className="min-h-[500px]">Home Page</div>
      <button onClick={handleRefetch}>Refetch1</button>
      <button onClick={handleRefetch2}>Refetch2</button>
      <Outlet />
    </>
  )
}

export default Home
