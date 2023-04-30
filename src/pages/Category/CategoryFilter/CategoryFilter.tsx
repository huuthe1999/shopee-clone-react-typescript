import { HTMLAttributes, memo } from 'react'

import classNames from 'classnames'
import { Filter } from 'react-feather'

import { Button, CateSection, PingIcon } from '@/components'

import { SetParamsProps } from '../Category'

interface Props extends HTMLAttributes<HTMLDivElement> {
  headerText: string
  hasFilter: boolean
  data: {
    type: string
    name: string
    data: {
      id: string
      text: string
    }[]
  }[]
  onChangeParam: (params?: SetParamsProps) => void
}

function CategoryFilter({ headerText, hasFilter, data, className, onChangeParam }: Props) {
  return (
    <div className={classNames('flex flex-col gap-y-2', [className])}>
      {/* Header name */}
      <div className="flex gap-x-2 py-2 pt-5">
        <span className="relative">
          {hasFilter && <PingIcon />}
          <Filter size={16} />
        </span>

        <h2 className="font-bold uppercase">{headerText}</h2>
      </div>
      {data.map((cateSection, index) => (
        <CateSection key={index} {...cateSection} onChangeParam={onChangeParam} />
      ))}
      <Button
        className="uppercase mt-2 mx-auto bg-primary text-white w-full py-1 rounded-sm text-sm"
        disabled={!hasFilter}
        onClick={() => onChangeParam()}>
        Xoá tất cả
      </Button>
    </div>
  )
}
export default memo(CategoryFilter)
