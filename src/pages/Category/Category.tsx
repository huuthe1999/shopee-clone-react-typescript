import { useRef } from 'react'

import classNames from 'classnames'
import queryString from 'query-string'
import { AlertOctagon } from 'react-feather'
import { Helmet } from 'react-helmet-async'
import { Navigate, useLocation, useMatch, useParams, useSearchParams } from 'react-router-dom'

import { Pagination, ProductList, SkeletonProduct } from '@/components'
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
    isLoading: isProductsLoading,
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
      <Helmet>
        <title>
          {matchSearchPage
            ? 'Kết quả tìm kiếm cho từ khoá "' + searchParams.get('keyword') + '"'
            : `Mua sắm online sản phẩm ${categorySlug?.substring(
                0,
                categorySlug.lastIndexOf('-')
              )} giá
          tốt`}
        </title>
        <meta name="description" content="Danh sách sản phẩm" data-react-helmet="true" />
        <link rel="canonical" href={pathname} data-react-helmet="true" />
      </Helmet>
      <div
        className={classNames('flex gap-x-4 sm:my-2 md:my-8 lg:my-16', {
          'pointer-events-none opacity-50': isProductsFetching
        })}
        ref={ref}>
        {isProductsLoading && (
          <>
            <div className="flex flex-col gap-y-3 divide-y-2 divide-gray-300 bg-white max-sm:hidden md:basis-1/6">
              <div className="bg-gray-300 py-2 pt-5" />
              <div className="flex flex-col gap-y-1 py-2">
                <p className="bg-gray-300 py-1 pt-5" />
                <div className="bg-gray-300 py-2 pt-5" />
                <div className="bg-gray-300 py-2 pt-5" />
                <div className="bg-gray-300 py-2 pt-5" />
              </div>
              <div className="flex flex-col gap-y-1 py-2">
                <p className="bg-gray-300 py-1 pt-5" />
                <div className="bg-gray-300 py-2 pt-5" />
                <div className="bg-gray-300 py-2 pt-5" />
                <div className="bg-gray-300 py-2 pt-5" />
              </div>
              <div className="flex flex-col gap-y-1 py-2">
                <p className="bg-gray-300 py-1 pt-5" />
                <div className="bg-gray-300 py-2 pt-5" />
                <div className="bg-gray-300 py-2 pt-5" />
                <div className="bg-gray-300 py-2 pt-5" />
              </div>
              <div className="flex flex-col gap-y-1 py-2">
                <p className="bg-gray-300 py-1 pt-5" />
                <div className="bg-gray-300 py-2 pt-5" />
                <div className="bg-gray-300 py-2 pt-5" />
                <div className="bg-gray-300 py-2 pt-5" />
              </div>
              <div className="flex flex-col gap-y-1 py-2">
                <p className="bg-gray-300 py-1 pt-5" />
                <div className="bg-gray-300 py-2 pt-5" />
                <div className="bg-gray-300 py-2 pt-5" />
                <div className="bg-gray-300 py-2 pt-5" />
              </div>
            </div>
            <div className="basis-full md:basis-5/6">
              <div className="flex h-full flex-col">
                <div className="flex items-center gap-x-3 bg-black/5 px-5 py-3">
                  <p className="bg-gray-300 px-7 py-3 max-sm:hidden" />
                  <div className="rounded-md bg-gray-300 px-8 py-4 max-sm:flex-1" />
                  <div className="rounded-md bg-gray-300 px-8 py-4 max-sm:flex-1" />
                  <div className="rounded-md bg-gray-300 px-8 py-4 max-sm:flex-1" />
                  <div className="rounded-md bg-gray-300 px-8 py-4 max-sm:flex-1 sm:hidden" />
                  <div className="rounded-md bg-gray-300 px-28 py-4 max-sm:hidden" />
                  <div className="ml-auto flex items-center gap-x-2 max-sm:hidden">
                    <span className="rounded-md bg-gray-300 px-5 py-4" />
                    <div className="rounded-md bg-gray-300 px-5 py-5" />
                    <div className="rounded-md bg-gray-300 px-5 py-5" />
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-2 place-items-center gap-2 p-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {Array(PRODUCTS_SIZE)
                    .fill(null)
                    .map((_, index) => (
                      <SkeletonProduct key={index} />
                    ))}
                </div>
              </div>
            </div>
          </>
        )}
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
                  className="hidden min-h-fit basis-1/6 bg-white px-2 pb-2 lg:block"
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
                className={classNames('flex basis-full flex-col', {
                  'lg:basis-full': products.length === 0,
                  'lg:basis-5/6': products.length > 0
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
                  <div className="relative">
                    <CategorySortBar
                      className="bg-black/[0.03]"
                      pageCount={data?.data.data.totalPages ?? 1}
                    />
                    <div className="absolute right-5 top-3.5 z-[100] rounded-sm bg-white px-2 text-primary max-sm:hidden lg:hidden">
                      <CategoryFilterMobile
                        hasFilter={hasFilter}
                        headerText="Bộ lọc tìm kiếm"
                        className="flex shrink-0 flex-nowrap items-end p-1"
                        onChangeParam={handleSetParams}>
                        <CategoryFilter
                          headerText="Bộ lọc tìm kiếm"
                          hasFilter={hasFilter}
                          onChangeParam={handleSetParams}
                          className="px-2 pb-4"
                        />
                      </CategoryFilterMobile>
                    </div>
                  </div>
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
