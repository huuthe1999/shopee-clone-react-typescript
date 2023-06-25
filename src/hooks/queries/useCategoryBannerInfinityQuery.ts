import { useInfiniteQuery } from '@tanstack/react-query'

import { QUERY_KEYS, SIZE } from '@/constants'
import { categoryServices } from '@/services'

const useCategoryBannerInfinityQuery = (size = SIZE) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.category.list, { size }],
    queryFn: ({ pageParam = 1 }) => categoryServices.getCategories({ page: pageParam, size }),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    enabled: !!size,
    getNextPageParam: (lastPage) => lastPage.data.data.nextPage,
    getPreviousPageParam: (firstPage) => firstPage.data.data.prevPage
  })
}

export default useCategoryBannerInfinityQuery
