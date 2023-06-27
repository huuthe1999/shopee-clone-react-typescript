import { useRef } from 'react'

import classNames from 'classnames'
import queryString from 'query-string'
import { AlertOctagon } from 'react-feather'
import { Navigate, useLocation, useMatch, useParams, useSearchParams } from 'react-router-dom'

import { Pagination, ProductList } from '@/components'
import { PAGE, PATHS, PRODUCTS_SIZE } from '@/constants'
import { DEFAULT_FILTER_DATA } from '@/data/category'
import { useProductsQuery } from '@/hooks'
import CategoryFilterMobile from '@/pages/Category/CategoryFilterMobile'
import { OrderType, SortByType } from '@/types'
import {
  SearchParamsProps,
  formatCommaSearchParamUrl,
  formatSearchParamUrl,
  splittingId
} from '@/utils'

import CategoryFilter from './CategoryFilter'
import CategorySortBar from './CategorySortBar'

const CategoryPage = () => {
  const { categorySlug } = useParams()
  const matchSearchPage = useMatch(PATHS.SEARCH_PATH)

  const categoryId = splittingId(categorySlug)
  const { pathname } = useLocation()

  // Calculate height of filter side
  const ref = useRef<HTMLDivElement>(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const { page, order, sortBy, ...rest } = queryString.parse(searchParams.toString(), {
    arrayFormat: 'comma'
  })

  const {
    data,
    isFetching: isProductsFetching,
    isInitialLoading
  } = useProductsQuery({
    size: PRODUCTS_SIZE,
    page: page ? +page + 1 : PAGE + 1,
    order: order,
    categoryId,
    sortBy: sortBy ? sortBy : 'popular',
    ...(rest && { ...rest })
  })

  if (!categoryId && !matchSearchPage) {
    return <Navigate to={PATHS.NOT_FOUND_PATH} replace />
  }

  const products = data?.data.data.items

  // Check is filtering
  const hasFilter = DEFAULT_FILTER_DATA.some((data) => searchParams.has(data))

  const handleSetParams = (params?: SearchParamsProps) => {
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
  }

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
        className={classNames('flex gap-x-4 sm:my-2 md:my-16', {
          'pointer-events-none opacity-50': isProductsFetching
        })}
        ref={ref}>
        {products ? (
          products.length === 0 && pathname === PATHS.SEARCH_PATH ? (
            <div className="mx-auto">
              <img
                src="/images/loading-image-product.png"
                alt="loading-product"
                className="mx-auto aspect-square w-36"
              />
              <p>Không tìm thấy kết quả nào</p>
            </div>
          ) : (
            <>
              {/* Filter button on mobile */}
              <CategoryFilterMobile
                hasFilter={hasFilter}
                headerText="Bộ lọc tìm kiếm"
                onChangeParam={handleSetParams}>
                <CategoryFilter
                  headerText="Bộ lọc tìm kiếm"
                  hasFilter={hasFilter}
                  onChangeParam={handleSetParams}
                  className="px-2 pb-4"
                />
              </CategoryFilterMobile>

              {/* Filter side */}
              {products.length > 0 && (
                <div
                  className="hidden min-h-fit basis-1/6 bg-white px-2 pb-2 md:block"
                  style={{ minHeight: ref.current?.clientHeight + 'px' }}>
                  <CategoryFilter
                    headerText="Bộ lọc tìm kiếm"
                    hasFilter={hasFilter}
                    onChangeParam={handleSetParams}
                    className="sticky top-0 z-10"
                  />
                </div>
              )}
              {/* Product list aside*/}
              <div
                className={classNames('flex basis-full flex-col md:basis-5/6', {
                  'md:basis-full': products.length === 0,
                  'md:basis-5/6': products.length > 0
                })}>
                {searchParams.get('keyword') && (
                  <p className="py-6">
                    <AlertOctagon className="float-left mr-3" size={16} />
                    Kết quả tìm kiếm cho từ khoá &quot;
                    <span className="text-primary">{searchParams.get('keyword')}</span>
                    &quot;
                  </p>
                )}
                {/* Sort bar */}
                {products.length > 0 && (
                  <CategorySortBar
                    className="bg-black/[0.03]"
                    pageCount={data?.data.data.totalPages ?? 1}
                  />
                )}
                {/* Product list*/}
                <ProductList
                  isFetching={isInitialLoading}
                  className="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                  data={products}
                  onResetParam={handleSetParams}
                  hasFilter={hasFilter}
                />
                {products && products.length > 0 && (
                  <Pagination
                    pageCount={data?.data.data.totalPages ?? 1}
                    onPageChange={handlePageClick}
                  />
                )}
              </div>
            </>
          )
        ) : null}
      </div>
    </div>
  )
}

export default CategoryPage
