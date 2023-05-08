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
        <div className="max-w-6xl flex flex-col mx-auto gap-y-4">
          {/* Banner */}
          <Banner />
          {/* Category section */}
          <CateSection />
          {/* Product section */}
          <div className="mt-14" id="product-list">
            {/* Sticky header */}
            <nav className="sticky z-50 top-0 bg-white">
              <ul className="border-b-4 border-primary">
                <li className="text-primary text-center text-base uppercase cursor-pointer font-semibold tracking-wide">
                  <button
                    className="w-full py-4 px-5"
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
              <div className="grid gap-2 mt-2 grid-cols-6">
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
                className="border bg-gray-300 mx-auto block mt-4 px-4 py-2 rounded-sm hover:opacity-70 hover:border-stone-400 transition-all"
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
