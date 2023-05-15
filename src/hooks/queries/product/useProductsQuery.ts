import { useQuery } from '@tanstack/react-query'

import { ENDPOINTS, PAGE, SIZE } from '@/constants'
import { productServices } from '@/services'

export const useProductsQuery = ({ size = SIZE, page = PAGE, categorySlug, ...rest }: any = {}) => {
  return useQuery({
    queryKey: [ENDPOINTS.CATEGORY_END_POINT, { size, page, categorySlug, ...rest }],
    queryFn: ({ signal }) =>
      productServices.getProducts(signal, { page, size, categorySlug, ...rest }),
    enabled: categorySlug !== undefined,
    keepPreviousData: true,
    staleTime: 30 * 1000
  })
}
