import { useQuery } from '@tanstack/react-query'

import { Banner, ProductList } from '@/components'
import { ENDPOINTS } from '@/constants'
import { useAuthContext } from '@/contexts'
import { useAxiosPrivate, useProfileQuery } from '@/hooks'
import { ProfileSuccessResponse } from '@/types/user.response'

import CateSection from './CateSection'

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
      <div className="bg-white py-8">
        <div className="max-w-6xl flex flex-col mx-auto gap-y-4">
          {/* Banner */}
          <Banner />
          <CateSection />
          {/* Product section */}
          <ProductList />
        </div>
      </div>
    </>
  )
}

export default Home
