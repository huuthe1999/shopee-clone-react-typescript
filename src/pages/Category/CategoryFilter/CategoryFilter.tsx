import { HTMLAttributes, memo } from 'react'

import { Rating } from '@smastrom/react-rating'
import classNames from 'classnames'
import { Filter } from 'react-feather'

import { Button, CateSection, PingIcon, customItemStyles } from '@/components'
import { SearchParamsProps } from '@/utils'

import CategoryFilterPrice from './CategoryFilterPrice'

const fakeData = [
  {
    type: 'filters',
    name: 'Loại Shop',
    data: [
      {
        id: '11',
        text: 'Shopee Mall'
      },
      {
        id: '21',
        text: 'Shop Yêu thích'
      }
    ]
  },
  {
    type: 'status',
    name: 'Tình Trạng',
    data: [
      {
        id: '31',
        text: 'Đã sử dụng'
      },
      {
        id: '41',
        text: 'Mới'
      }
    ]
  },
  {
    type: 'ratingFilter',
    name: 'Đánh Giá',
    data: [
      {
        id: '51',
        text: (
          <Rating
            readOnly
            value={5}
            itemStyles={customItemStyles}
            className="pr-6"
            style={{ maxWidth: 100 }}
          />
        )
      },
      {
        id: '61',
        text: (
          <Rating
            readOnly
            value={4}
            itemStyles={customItemStyles}
            className="pr-6"
            style={{ maxWidth: 100 }}
          />
        )
      },
      {
        id: '71',
        text: (
          <Rating
            readOnly
            value={3}
            itemStyles={customItemStyles}
            className="pr-6"
            style={{ maxWidth: 100 }}
          />
        )
      },
      {
        id: '81',
        text: (
          <Rating
            readOnly
            value={2}
            itemStyles={customItemStyles}
            className="pr-6"
            style={{ maxWidth: 100 }}
          />
        )
      },
      {
        id: '91',
        text: (
          <Rating
            readOnly
            value={1}
            itemStyles={customItemStyles}
            className="pr-6"
            style={{ maxWidth: 100 }}
          />
        )
      }
    ]
  }
]

interface Props extends HTMLAttributes<HTMLDivElement> {
  headerText: string
  hasFilter: boolean
  data: {
    type: string
    name: string
    data: {
      id: string
      text: React.ReactNode
    }[]
  }[]
  onChangeParam: (params?: SearchParamsProps) => void
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

      {/* Default filter */}

      {/* Range price */}
      <CategoryFilterPrice />

      {fakeData.map((cateSection, index) => (
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
