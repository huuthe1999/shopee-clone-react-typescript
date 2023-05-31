import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

import { QUERY_KEYS } from '@/constants'
import { useAuthContext } from '@/contexts'
import { useAxiosPrivate } from '@/hooks'
import { orderServices } from '@/services'
import { BaseResponse, ICartResponse, ICartStatus } from '@/types'

export interface OrderQueryProps {
  status: ICartStatus
  page?: number
  size: number
}
export const useOrderQuery = ({ status, page, size }: OrderQueryProps) => {
  useAxiosPrivate()
  const { accessToken } = useAuthContext()

  return useQuery<AxiosResponse<ICartResponse>, AxiosError<BaseResponse>>({
    queryKey: [QUERY_KEYS.order, { status, page, size }],
    queryFn: () => orderServices.getInCart({ status, page, size }),
    enabled: Boolean(accessToken),
    keepPreviousData: true,
    staleTime: 60 * 1000
  })
}
