import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'

import { FAV_PRODUCTS_SIZE, PAGE, PATHS, QUERY_KEYS, SIZE } from '@/constants'
import { productServices } from '@/services'

export const useProductsQuery = ({
  size = SIZE,
  page = PAGE,
  enabled,
  type,
  ...rest
}: any = {}) => {
  const { pathname } = useLocation()

  return useQuery({
    queryKey: [QUERY_KEYS.product.list, { size, page, type, ...rest }],
    queryFn: () => productServices.getProducts({ page, size, ...rest }),
    enabled:
      enabled ?? (!!rest?.categoryId || Boolean(rest?.keyword && pathname === PATHS.SEARCH_PATH)),
    keepPreviousData: true,
    staleTime: 60 * 1000
  })
}

export const useFavProductsQuery = (enabled = true) => {
  return useQuery({
    queryKey: [QUERY_KEYS.favProducts, { size: FAV_PRODUCTS_SIZE }],
    queryFn: () => productServices.getProducts({ sortBy: 'popular', size: FAV_PRODUCTS_SIZE }),
    staleTime: 5 * 60 * 1000,
    enabled: enabled
  })
}
