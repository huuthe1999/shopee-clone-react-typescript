import { useInfiniteQuery } from '@tanstack/react-query'

import { ENDPOINTS } from '@/constants'
import { bannerServices } from '@/services'

const useCateCardBanner = (size?: number) => {
  return useInfiniteQuery({
    queryKey: [ENDPOINTS.CATE_BANNER_END_POINT, { size }],
    queryFn: ({ signal, pageParam = 1 }) =>
      bannerServices.getCateCardBanner(signal, pageParam, size),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    getNextPageParam: (lastPage) => lastPage.data.data.nextPage,
    getPreviousPageParam: (firstPage) => firstPage.data.data.prevPage
  })
}

export default useCateCardBanner
