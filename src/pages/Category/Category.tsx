import { useCallback, useRef, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { ProductList } from '@/components'
import { OrderType, SortByType } from '@/types'

import CategoryFilter from './CategoryFilter'
import CategorySortBar from './CategorySortBar'

const fakeData = [
  {
    type: 'facet',
    name: 'Theo Danh Mục',
    data: [
      {
        id: '1',
        text: 'Áo hoodie 1'
      },
      {
        id: '2',
        text: 'Áo hoodie 2'
      },
      {
        id: '3',
        text: 'Áo hoodie 3'
      },
      {
        id: '4',
        text: 'Áo hoodie 4'
      }
    ]
  },
  {
    type: 'locations',
    name: 'Nơi bán',
    data: [
      {
        id: '5',
        text: 'TP. Hồ Chí Minh 1'
      },
      {
        id: '6',
        text: 'TP. Hồ Chí Minh 2'
      },
      {
        id: '7',
        text: 'TP. Hồ Chí Minh 3'
      },
      {
        id: '8',
        text: 'TP. Hồ Chí Minh 4'
      }
    ]
  }
]
interface Props {}

export type SetParamsProps = { type: string; key: string; value: boolean }

const CategoryPage = (props: Props) => {
  // Calculate height of filter side
  const ref = useRef<HTMLDivElement>(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const [page, setPage] = useState(searchParams.get('page') || 1)
  const [order, setOrder] = useState<OrderType>((searchParams.get('order') as OrderType) || 'asc')
  const [sortBy, setSortBy] = useState<SortByType>(
    (searchParams.get('sortBy') as SortByType) || 'popular'
  )

  const handleSetSortBy = useCallback((sortByName: string, orderName?: OrderType) => {
    setSortBy(sortByName as SortByType)
    if (orderName) {
      setOrder(orderName)
    }
  }, [])

  const handleSetParams = useCallback(
    (params?: SetParamsProps) => {
      if (params) {
        const { type, key, value } = params
        setSearchParams(
          (prevParam) => {
            const prevTypeParam = prevParam.get(type)

            // Nếu param chưa có => Thêm mới
            if (!prevTypeParam) {
              prevParam.append(type, key)
            } else {
              // Dựa vào value để edit param
              const filterParams = value
                ? [...prevParam.getAll(type), key]
                : prevTypeParam.split(',').filter((param) => param !== key)

              if (filterParams.length > 0) {
                prevParam.set(type, filterParams.join(','))
              } else {
                prevParam.delete(type)
              }
            }

            prevParam.sort()
            return prevParam
          },
          { preventScrollReset: true }
        )
      } else {
        setSearchParams({
          page: page.toString(),
          order,
          sortBy
        })
      }
    },
    [setSearchParams, page, order, sortBy]
  )

  return (
    <div className="max-w-6xl mx-auto h-full">
      <div className="flex my-16 gap-x-4" ref={ref}>
        {/* Filter side */}
        <div
          className="basis-1/6 px-2 bg-white"
          style={{ height: ref.current?.clientHeight + 'px' }}>
          <CategoryFilter
            headerText="BỘ LỌC TÌM KIẾM"
            hasFilter={Boolean(searchParams.toString())}
            data={fakeData}
            onChangeParam={handleSetParams}
            className="sticky top-0 z-10"
          />
        </div>
        {/* Product list aside*/}
        <div className="basis-5/6">
          {/* Sort bar */}
          <CategorySortBar
            order={order}
            sortBy={sortBy}
            onSortBy={handleSetSortBy}
            className="sticky top-0 z-20 bg-white"
          />
          {/* Product list*/}
          <ProductList className="grid-cols-5" />
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
