import { HTMLAttributes } from 'react'

import { TFilterType } from '@/data/category'
import { SearchParamsProps } from '@/utils'

export interface CateSectionProps extends HTMLAttributes<HTMLElement> {
  type: TFilterType
  name: string
  data: {
    _id: string | number
    name: React.ReactNode
  }[]
  onChangeParam: (params?: SearchParamsProps) => void
}
