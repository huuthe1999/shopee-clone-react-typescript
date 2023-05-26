import { ChevronLeft, ChevronRight } from 'react-feather'
import { useSearchParams } from 'react-router-dom'

import { Button } from '@/components'
import { PAGE } from '@/constants'
import { useOrderQuery } from '@/hooks'

import { CartTableHeader, CartTableRow } from './components'

interface Props {}

const Cart = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = Number(searchParams.get('page'))

  const { data: productsCartQueryData, isLoading: isLoadingProductsCart } = useOrderQuery({
    status: -1,
    page: page ?? PAGE
  })
  const productsCartData = productsCartQueryData?.data.data

  const renderCartRow = isLoadingProductsCart
    ? Array(4)
        .fill(null)
        .map((_, index) => (
          <div
            className="flex overflow-auto rounded-sm px-5 py-4 text-sm text-zinc-500 shadow"
            key={index}>
            <div className="flex basis-1/2 animate-pulse items-center gap-x-2">
              <span className="h-[1.125rem] w-[1.125rem] shrink-0 bg-gray-200" />

              <img
                src="/images/loading-image-product.png"
                alt="product_loading_img_cart"
                className="aspect-square h-fit w-20 bg-gray-200"
              />

              <div className="flex-grow self-stretch">
                <p className="mb-2 h-4 bg-gray-200" />
                <p className="h-4 bg-gray-200" />
              </div>
            </div>
          </div>
        ))
    : productsCartData?.items.map((cartProduct) => {
        return <CartTableRow key={cartProduct._id} data={{ ...cartProduct }} />
      })
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-y-4 py-5">
      {/* Pagination */}
      <div className="flex items-center justify-between border-2 border-secondary bg-neutral-200 px-5 py-4">
        <span className="text-xl">Tất cả 11 sản phẩm</span>
        <div className="flex items-center justify-end gap-2 self-stretch">
          <p className="my-auto flex flex-nowrap px-2">
            <span className="line-clamp-1 text-primary">{11}</span>
            <span className="line-clamp-1">/{22}</span>
          </p>

          <Button
            className="h-full bg-white px-3 text-center"
            // disabled={page === 0}
            // onClick={handleSetPrevPage}
          >
            <ChevronLeft size={16} />
          </Button>
          <Button
            className="h-full bg-white px-3 text-center"
            // disabled={page === pageCount - 1}
            // onClick={handleSetNextPage}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
      <CartTableHeader isLoading={isLoadingProductsCart} />
      <div className="flex flex-col divide-y border border-black/10">{renderCartRow}</div>
    </div>
  )
}

export default Cart
