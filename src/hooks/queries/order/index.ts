import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

import { QUERY_KEYS } from '@/constants'
import { useAuthContext } from '@/contexts'
import { useAxiosPrivate } from '@/hooks'
import { orderServices } from '@/services'
import { BaseResponse, ICart, ICartStatus, IDataPaginationResponse } from '@/types'

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
    enabled: enabled ? enabled && Boolean(accessToken) : Boolean(accessToken),
    keepPreviousData: true
  })
}
