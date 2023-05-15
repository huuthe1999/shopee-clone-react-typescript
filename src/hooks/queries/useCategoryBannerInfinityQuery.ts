import { useInfiniteQuery } from '@tanstack/react-query'

import { ENDPOINTS, SIZE } from '@/constants'
import { categoryServices } from '@/services'

const useCategoryBannerInfinityQuery = (size = SIZE) => {
  return useInfiniteQuery({
    queryKey: [ENDPOINTS.CATEGORY_END_POINT, { size }],
    queryFn: ({ signal, pageParam = 1 }) =>
      categoryServices.getCategories(signal, { page: pageParam, size }),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    getNextPageParam: (lastPage) => lastPage.data.data.nextPage,
    getPreviousPageParam: (firstPage) => firstPage.data.data.prevPage
  })
}

export default useCategoryBannerInfinityQuery
