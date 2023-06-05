import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'

import { ENDPOINTS, FAV_PRODUCTS_SIZE, PAGE, PATHS, QUERY_KEYS, SIZE } from '@/constants'
import { productServices } from '@/services'

export const useProductsQuery = ({
  size = SIZE,
  page = PAGE,
  type,
  enabled,
  ...rest
}: any = {}) => {
  const { pathname } = useLocation()

  return useQuery({
    queryKey: [ENDPOINTS.PRODUCT_END_POINT, { size, page, type, ...rest }],
    queryFn: ({ signal }) => productServices.getProducts(signal, { page, size, ...rest }),
    enabled:
      enabled ??
      ((rest?.categorySlug && !PATHS.SEARCH_PATH.includes(rest?.categorySlug)) ||
        Boolean(rest?.keyword && pathname === PATHS.SEARCH_PATH)),
    keepPreviousData: true,
    staleTime: 60 * 1000
  })
}

export const useFavProductsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.favProducts, { size: FAV_PRODUCTS_SIZE }],
    queryFn: ({ signal }) =>
      productServices.getProducts(signal, { sortBy: 'popular', size: FAV_PRODUCTS_SIZE }),
    staleTime: 5 * 60 * 1000
  })
}
