import { Banner, Button, ProductList, Skeleton } from '@/components'
import { useProductsInfiniteQuery } from '@/hooks'

import CateSection from './CateSection'

const Home = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useProductsInfiniteQuery({
      size: 12
    })

  return (
    <>
      <div className="bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-y-4">
          {/* Banner */}
          <Banner />
          {/* Category section */}
          <CateSection />
          {/* Product section */}
          <div className="mt-14" id="product-list">
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
            {data?.pages.map((page) => (
              <ProductList
                className="grid-cols-6"
                data={page.data.data.items}
                key={page.data.data.nextPage}
              />
            ))}
            {(isLoading || isFetchingNextPage) && (
              <div className="mt-2 grid grid-cols-6 gap-2">
                {Array(12)
                  .fill(null)
                  .map((item, index) => (
                    <Skeleton key={index} />
                  ))}
              </div>
            )}
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
