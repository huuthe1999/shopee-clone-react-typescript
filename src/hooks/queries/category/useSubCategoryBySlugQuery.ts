import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { QUERY_KEYS } from '@/constants'
import { categoryServices } from '@/services'
import { splittingId } from '@/utils'

export const useSubCategoryBySlugQuery = () => {
  const { categorySlug } = useParams()
  const categoryId = splittingId(categorySlug)

  return useQuery({
    queryKey: [QUERY_KEYS.subCategory, categoryId],
    queryFn: () =>
      categoryServices.getSubCategory(categoryId as string, { select: ['subCategories'] }),
    keepPreviousData: true,
    enabled: !!categoryId,
    staleTime: Infinity
  })
}
