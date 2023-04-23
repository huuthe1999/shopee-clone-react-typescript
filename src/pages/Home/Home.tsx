import { useQuery } from '@tanstack/react-query'

import { Banner } from '@/components'
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
    enabled: !!accessToken
  })

  const handleRefetch = () => profileQuery.refetch()
  const handleRefetch2 = () => profileQuery2.refetch()

  return (
    <>
      <Banner />
      <div className="max-w-6xl mx-auto">
        <div className="min-h-[500px]">Home Page</div>
        <button onClick={handleRefetch}>Refetch1</button>
        <button onClick={handleRefetch2}>Refetch2</button>
      </div>
    </>
  )
}

export default Home
