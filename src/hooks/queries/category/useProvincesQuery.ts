import { useQuery } from '@tanstack/react-query'

import { ENDPOINTS } from '@/constants'
import { provinceServices } from '@/services'

export const useProvincesQuery = () => {
  return useQuery({
    queryKey: [ENDPOINTS.PROVINCE_END_POINT],
    queryFn: ({ signal }) => provinceServices.getProvinces(signal),
    staleTime: Infinity
  })
}
