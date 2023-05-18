import { useCallback, useMemo, useRef } from 'react'

import classNames from 'classnames'
import queryString from 'query-string'
import { useParams, useSearchParams } from 'react-router-dom'

import { Pagination, ProductList } from '@/components'
import { DEFAULT_FILTER_DATA } from '@/data/category'
import { useProductsQuery } from '@/hooks'
import { OrderType, SortByType } from '@/types'
import { SearchParamsProps, formatCommaSearchParamUrl, formatSearchParamUrl } from '@/utils'

import CategoryFilter from './CategoryFilter'
import CategorySortBar from './CategorySortBar'

const CategoryPage = () => {
  const { categorySlug } = useParams()

  // Calculate height of filter side
  const ref = useRef<HTMLDivElement>(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const { page, order, sortBy, ...rest } = queryString.parse(searchParams.toString(), {
    arrayFormat: 'comma'
  })

  const { data, isFetching: isProductsFetching } = useProductsQuery({
    size: 15,
    page: page ? +page + 1 : 1,
    categorySlug,
    order: order,
    sortBy: sortBy ? sortBy : 'popular',
    ...(rest && { ...rest })
  })

  const products = data?.data.data.items

  // Check is filtering
  const hasFilter = useMemo(
    () => DEFAULT_FILTER_DATA.some((data) => searchParams.has(data)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Array.from(searchParams.keys()).length]
  )

  const handleSetParams = useCallback(
    (params?: SearchParamsProps) => {
      if (params) {
        const newParamsObject = formatCommaSearchParamUrl({ searchParams, params })
        setSearchParams(newParamsObject)
      } else {
        // Reset params
        setSearchParams(
          queryString.stringify(
            {
              page: 0,
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
    <div className="mx-auto h-full max-w-6xl">
      <div
        className={classNames('my-2 flex gap-x-4 md:my-16', {
          'pointer-events-none opacity-50': isProductsFetching
        })}
        ref={ref}>
        {/* Filter side */}
        <div
          className="hidden min-h-fit basis-1/6 bg-white px-2 pb-2 md:block"
          style={{ minHeight: ref.current?.clientHeight + 'px' }}>
          <CategoryFilter
            headerText="BỘ LỌC TÌM KIẾM"
            hasFilter={hasFilter}
            onChangeParam={handleSetParams}
            className="sticky top-0 z-10"
          />
        </div>
        {/* Product list aside*/}
        <div className="basis-full md:basis-5/6">
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
          {products && products.length > 0 && (
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
