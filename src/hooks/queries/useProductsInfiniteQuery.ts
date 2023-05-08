import { useInfiniteQuery } from '@tanstack/react-query'

import { ENDPOINTS } from '@/constants'
import { productServices } from '@/services'

const useProductsInfiniteQuery = ({ size }: { size?: number } = {}) => {
  return useInfiniteQuery({
    queryKey: [ENDPOINTS.PRODUCT_END_POINT, { size }],
    queryFn: ({ signal, pageParam = 1 }) =>
      productServices.getDailyProducts(signal, pageParam, size),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    getNextPageParam: (lastPage) => lastPage.data.data.nextPage,
    getPreviousPageParam: (firstPage) => firstPage.data.data.prevPage
  })
}

export default useProductsInfiniteQuery
