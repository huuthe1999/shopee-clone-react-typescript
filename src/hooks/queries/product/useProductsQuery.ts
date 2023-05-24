import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'

import { ENDPOINTS, PAGE, PATHS, SIZE } from '@/constants'
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
