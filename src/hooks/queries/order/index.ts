import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

import { QUERY_KEYS, SIZE } from '@/constants'
import { useAuthContext } from '@/contexts'
import { useAxiosPrivate } from '@/hooks'
import { orderServices } from '@/services'
import { BaseResponse, ICart, ICartCompleted, ICartStatus, IDataPaginationResponse } from '@/types'

export interface OrderQueryProps {
  enabled?: boolean
  key?: string
  status: ICartStatus
  page?: number
  size: number
}
export const useOrderQuery = ({ status, page, size, key, enabled }: OrderQueryProps) => {
  useAxiosPrivate()
  const { accessToken } = useAuthContext()

  return useQuery<AxiosResponse<IDataPaginationResponse<ICart[]>>, AxiosError<BaseResponse>>({
    queryKey: [key ?? QUERY_KEYS.order.list, { status, page, size }],
    queryFn: () => orderServices.getInCart({ status, page, size }),
    enabled: enabled !== undefined ? enabled && Boolean(accessToken) : Boolean(accessToken),
    keepPreviousData: true
  })
}

export const useOrderInfinityQuery = () => {
  return useInfiniteQuery<IDataPaginationResponse<ICartCompleted[]>, AxiosError<BaseResponse>>({
    queryKey: [QUERY_KEYS.order.complete, { size: SIZE, status: 1 }],
    queryFn: ({ pageParam = 1 }) =>
      orderServices.getCompletedCart({ size: SIZE, page: pageParam, status: 1 }),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    getNextPageParam: (lastPage) => lastPage.data.nextPage,
    getPreviousPageParam: (firstPage) => firstPage.data.prevPage
  })
}
