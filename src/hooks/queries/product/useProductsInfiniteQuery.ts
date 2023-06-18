import { useInfiniteQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants'
import { productServices } from '@/services'

export const useProductsInfiniteQuery = ({ size }: { size?: number } = {}) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.product.infinity, { size }],
    queryFn: ({ pageParam = 1 }) => productServices.getDailyProducts(pageParam, size),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    getNextPageParam: (lastPage) => lastPage.data.data.nextPage,
    getPreviousPageParam: (firstPage) => firstPage.data.data.prevPage
  })
}
