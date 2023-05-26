import { useCallback, useMemo, useRef } from 'react'

import classNames from 'classnames'
import queryString from 'query-string'
import { AlertOctagon } from 'react-feather'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'

import { Pagination, ProductList } from '@/components'
import { PATHS } from '@/constants'
import { DEFAULT_FILTER_DATA } from '@/data/category'
import { useProductsQuery } from '@/hooks'
import { OrderType, SortByType } from '@/types'
import { SearchParamsProps, formatCommaSearchParamUrl, formatSearchParamUrl } from '@/utils'

import CategoryFilter from './CategoryFilter'
import CategorySortBar from './CategorySortBar'

const CategoryPage = () => {
  const { categorySlug } = useParams()
  const { pathname } = useLocation()

  // Calculate height of filter side
  const ref = useRef<HTMLDivElement>(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const { page, order, sortBy, keyword, ...rest } = queryString.parse(searchParams.toString(), {
    arrayFormat: 'comma'
  })

  const {
    data,
    isFetching: isProductsFetching,
    isInitialLoading
  } = useProductsQuery({
    size: 15,
    page: page ? +page + 1 : 1,
    ...(pathname === PATHS.SEARCH_PATH ? { type: 'search', keyword } : { categorySlug }),
    order: order,
    sortBy: sortBy ? sortBy : 'popular',
    ...(rest && { ...rest })
  })

  const products = data?.data.data.items

  // Check is filtering
  const hasFilter = useMemo(
    () => DEFAULT_FILTER_DATA.some((data) => searchParams.has(data)),
    [searchParams]
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
              keyword: searchParams.get('keyword') || '',
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

    setSearchParams(newParamsObject)
  }

  return (
    <div className="mx-auto h-fit max-w-6xl">
      <div
        className={classNames('my-2 flex gap-x-4 md:my-16', {
          'pointer-events-none opacity-50': isProductsFetching
        })}
        ref={ref}>
        {data?.data.data.items.length === 0 && pathname === PATHS.SEARCH_PATH ? (
          <div className="mx-auto">
            <img
              src="/images/loading-image-product.png"
              alt=""
              className="mx-auto aspect-square w-36"
            />
            <p>Không tìm thấy kết quả nào</p>
          </div>
        ) : (
          <>
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
            <div className="flex basis-full flex-col md:basis-5/6">
              {searchParams.get('keyword') && (
                <p className="py-6">
                  <AlertOctagon className="float-left mr-3" size={16} />
                  Kết quả tìm kiếm cho từ khoá &quot;
                  <span className="text-primary">{searchParams.get('keyword')}</span>
                  &quot;
                </p>
              )}
              {/* Sort bar */}
              <CategorySortBar
                className="bg-black/[0.03]"
                pageCount={data?.data.data.totalPages ?? 1}
              />
              {/* Product list*/}
              <ProductList
                isFetching={isInitialLoading}
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
          </>
        )}
      </div>
    </div>
  )
}

export default CategoryPage
