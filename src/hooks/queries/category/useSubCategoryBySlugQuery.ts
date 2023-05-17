import { useQuery } from '@tanstack/react-query'

import { ENDPOINTS } from '@/constants'
import { categoryServices } from '@/services'
import { ICategory } from '@/types'

export const useSubCategoryBySlugQuery = ({
  categorySlug,
  select
}: {
  categorySlug?: string
  select?: Array<keyof ICategory>
}) => {
  return useQuery({
    queryKey: [ENDPOINTS.CATEGORY_END_POINT, categorySlug, select],
    queryFn: ({ signal }) =>
      categoryServices.getSubCategoryBySlug(signal, categorySlug, { select }),
    keepPreviousData: true,
    enabled: categorySlug !== undefined,
    staleTime: Infinity
  })
}
