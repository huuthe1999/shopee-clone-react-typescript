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

  return (
    <>
      <div className="bg-white py-8">
        <div className="max-w-6xl flex flex-col mx-auto gap-y-4">
          {/* Banner */}
          <Banner />
          {/* Category section */}
          <CateSection />
          {/* Product section */}
          <div className="mt-14" id="product-list">
            {/* Sticky header */}
            <nav className="sticky z-50 top-0 bg-white">
              <ul className="border-b-4 border-primary">
                <li className="text-primary text-center text-base uppercase cursor-pointer font-semibold tracking-wide">
                  <button
                    className="w-full py-4 px-5"
                    onClick={(e) => {
                      e.preventDefault()
                      const target = document.getElementById('product-list')
                      if (target) {
                        target.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}>
                    GỢI Ý HÔM NAY
                  </button>
                </li>
              </ul>
            </nav>
            <ProductList className="grid-cols-6" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
