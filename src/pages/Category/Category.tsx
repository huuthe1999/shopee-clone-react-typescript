import { useCallback, useMemo, useRef } from 'react'

import queryString from 'query-string'
import { useParams, useSearchParams } from 'react-router-dom'

import { Pagination, ProductList } from '@/components'
import { useProductsQuery } from '@/hooks'
import { OrderType, SortByType } from '@/types'
import { SearchParamsProps, formatCommaSearchParamUrl, formatSearchParamUrl } from '@/utils'

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

const defaultParams = ['maxPrice', 'minPrice', 'filters', 'status', 'ratingFilter']

const CategoryPage = () => {
  const { categorySlug } = useParams()

  // Calculate height of filter side
  const ref = useRef<HTMLDivElement>(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const { page, order, sortBy } = queryString.parse(searchParams.toString(), {
    parseNumbers: true,
    arrayFormat: 'comma'
  })

  const { data } = useProductsQuery({
    size: 10,
    page: page ? +page + 1 : 1,
    categorySlug,
    order: order,
    sortBy: sortBy ? sortBy : 'popular'
  })

  const products = data?.data.data.items

  // Check is filtering
  const hasFilter = useMemo(() => {
    const hasType = fakeData.some((data) => {
      return searchParams.has(data.type)
    })

    const hasDefaultParam = Array.from(searchParams.keys()).some((param) =>
      defaultParams.includes(param)
    )
    return hasType || hasDefaultParam
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Array.from(searchParams.keys()).length])

  const handleSetParams = useCallback(
    (params?: SearchParamsProps) => {
      if (params) {
        const newParamsObject =
          params.name !== 'ratingFilter'
            ? formatCommaSearchParamUrl({ searchParams, params })
            : formatSearchParamUrl({ searchParams, params: [{ ...params }] })
        setSearchParams(newParamsObject)
      } else {
        // Reset params
        setSearchParams(
          queryString.stringify(
            {
              page: 1,
              minPrice: '',
              maxPrice: '',
              order: (searchParams.get('order') as OrderType) || '',
              sortBy: (searchParams.get('sortBy') as SortByType) || 'popular'
            },
            {
              arrayFormat: 'comma',
              skipNull: true,
              skipEmptyString: true
            }
          )
        )
      }
    },
    [setSearchParams, searchParams]
  )

  const handlePageClick = (event: { selected: number }) => {
    const newParamsObject = formatSearchParamUrl({
      searchParams,
      params: [{ name: 'page', value: event.selected }]
    })

    setSearchParams(newParamsObject, { preventScrollReset: true })
  }

  return (
    <div className="max-w-6xl mx-auto h-full">
      <div className="flex my-2 md:my-16 gap-x-4" ref={ref}>
        {/* Filter side */}
        <div
          className="basis-1/6 px-2 pb-2 bg-white hidden md:block min-h-fit"
          style={{ height: ref.current?.clientHeight + 'px' }}>
          <CategoryFilter
            headerText="BỘ LỌC TÌM KIẾM"
            hasFilter={hasFilter}
            data={fakeData}
            onChangeParam={handleSetParams}
            className="sticky top-0 z-10"
          />
        </div>
        {/* Product list aside*/}
        <div className="md:basis-5/6 basis-full">
          {/* Sort bar */}
          <CategorySortBar
            className="sticky top-0 z-20 bg-white"
            pageCount={data?.data.data.totalPages ?? 1}
          />
          {/* Product list*/}
          <ProductList
            className="grid-cols-3 sm:grid-cols-4 lg:grid-cols-5"
            data={products}
            onResetParam={handleSetParams}
            hasFilter={hasFilter}
          />
          {products && (
            <Pagination
              // key={searchParams.get('page')}
              pageCount={data?.data.data.totalPages ?? 1}
              onPageChange={handlePageClick}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
