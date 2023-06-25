import { useInfiniteQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants'
import { bannerServices } from '@/services'

const useCardBannerInfinityQuery = (size: number) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.category.banner, { size }],
    queryFn: ({ pageParam = 1 }) => bannerServices.getCateCardBanner({ page: pageParam, size }),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    enabled: !!size,
    getNextPageParam: (lastPage) => lastPage.data.data.nextPage,
    getPreviousPageParam: (firstPage) => firstPage.data.data.prevPage
  })
}

export default useCardBannerInfinityQuery
