import { useInfiniteQuery } from '@tanstack/react-query'

import { ENDPOINTS } from '@/constants'
import { bannerServices } from '@/services'

const useCateCardBanner = () => {
  return useInfiniteQuery({
    queryKey: [ENDPOINTS.CATE_BANNER_END_POINT],
    queryFn: ({ signal, pageParam = 1 }) => bannerServices.getCateCardBanner(signal, pageParam),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 2 * 5 * 60 * 1000,
    getNextPageParam: (lastPage) => lastPage.data.data.nextPage,
    getPreviousPageParam: (firstPage) => firstPage.data.data.prevPage
  })
}

export default useCateCardBanner
