import { useQuery } from '@tanstack/react-query'

import { ENDPOINTS, PAGE, SIZE } from '@/constants'
import { categoryServices } from '@/services'

export const useCategoriesQuery = ({
  size = SIZE,
  page = PAGE
}: { size?: number; page?: number } = {}) => {
  return useQuery({
    queryKey: [ENDPOINTS.CATEGORY_END_POINT, { size, page }],
    queryFn: ({ signal }) => categoryServices.getCategories(signal, { page, size }),
    keepPreviousData: true,
    staleTime: 60 * 1000
  })
}
