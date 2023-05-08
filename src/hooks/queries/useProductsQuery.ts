import { useQuery } from '@tanstack/react-query'

import { ENDPOINTS, PAGE, SIZE } from '@/constants'
import { productServices } from '@/services'

const useProductsQuery = ({ size = SIZE, page = PAGE, ...rest }: any = {}) => {
  return useQuery({
    queryKey: [ENDPOINTS.CATEGORY_END_POINT, { size, page, ...rest }],
    queryFn: ({ signal }) => productServices.getProducts(signal, { page, size, ...rest }),
    keepPreviousData: true,
    staleTime: 30 * 1000
  })
}
export default useProductsQuery
