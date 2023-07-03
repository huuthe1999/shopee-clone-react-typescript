import { Fragment } from 'react'

import { Helmet } from 'react-helmet-async'

import { Banner, Button, Product, SkeletonProduct } from '@/components'
import { FAV_PRODUCTS_SIZE, PATHS } from '@/constants'
import { useProductsInfiniteQuery } from '@/hooks'

import CateSection from './CateSection'

const Home = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useProductsInfiniteQuery({
      size: FAV_PRODUCTS_SIZE
    })

  return (
    <>
      <Helmet>
        <title>Shopee - Trang web thương mại điện tử Việt Nam</title>
        <meta
          name="description"
          content="Mua sắm trực tuyến hàng triệu sản phẩm ở tất cả ngành hàng. Đây là trang web chỉ phục vụ cho nhu cầu học tập"
          data-react-helmet="true"
        />
        <link rel="canonical" href={PATHS.HOME_PATH} data-react-helmet="true" />
      </Helmet>
      <div className="bg-white pb-4 md:py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-y-4">
          {/* Banner */}
          <Banner />
          {/* Category section */}
          <CateSection />
          {/* Product section */}
          <div className="mt-14 max-sm:mt-4" id="product-list">
            {/* Sticky header */}
            <nav className="sticky top-0 z-50 bg-white">
              <ul className="border-b-4 border-primary">
                <li className="cursor-pointer text-center text-base font-semibold uppercase tracking-wide text-primary">
                  <button
                    className="w-full px-5 py-4"
                    onClick={(e) => {
                      e.preventDefault()
                      const target = document.getElementById('product-list')
                      if (target) {
                        target.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}>
                    GỢI Ý HÔM NAY
                  </button>
                </li>
              </ul>
            </nav>
            <div className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-4 lg:grid-cols-6">
              {data?.pages.map((page) => (
                <Fragment key={page.data.data.nextPage}>
                  {page.data.data.items.map((product) => (
                    <Product key={product._id} {...product} />
                  ))}
                </Fragment>
              ))}
              {(isLoading || isFetchingNextPage) &&
                Array(FAV_PRODUCTS_SIZE)
                  .fill(null)
                  .map((item, index) => <SkeletonProduct key={index} />)}
            </div>

            {hasNextPage && (
              <Button
                disabled={isFetchingNextPage}
                className="mx-auto mt-4 block rounded-sm border bg-gray-300 px-4 py-2 transition-all hover:border-stone-400 hover:opacity-70"
                onClick={() => fetchNextPage()}>
                Xem thêm
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
