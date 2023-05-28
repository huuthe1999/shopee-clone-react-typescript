import { useCallback, useMemo, useState } from 'react'

import classNames from 'classnames'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { useSearchParams } from 'react-router-dom'

import { Button, Modal } from '@/components'
import { useOrderQuery } from '@/hooks'
import useBoolean from '@/hooks/useBoolean'
import { formatSearchParamUrl } from '@/utils'

import { CartTableFooter, CartTableHeader, CartTableRow } from './components'

interface Props {}

const Cart = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [productSelected, setProductSelected] = useState<string | undefined>()
  const { value, setValue } = useBoolean()

  const pageParam = searchParams.get('page')
  const page = pageParam ? +pageParam : 1

  const {
    data: productsCartQueryData,
    isLoading: isLoadingProductsCart,
    isFetching: isFetchingProductsCart
  } = useOrderQuery({
    status: -1,
    page: page
  })
  const productsCartData = productsCartQueryData?.data.data

  const handleSelectProduct = useCallback(
    (id: string) => {
      setValue(true)
      setProductSelected(id)
    },
    [setValue]
  )

  const renderCartRow = useMemo(() => {
    return isLoadingProductsCart
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
          return (
            <CartTableRow
              key={cartProduct._id}
              data={{ ...cartProduct }}
              onSelectProduct={handleSelectProduct}
            />
          )
        })
  }, [isLoadingProductsCart, handleSelectProduct, productsCartData?.items])

  const handleSetPrevPage = () => {
    const newParamsObject = formatSearchParamUrl({
      searchParams,
      params: [{ name: 'page', value: page - 1 }]
    })

    setSearchParams(newParamsObject)
  }

  const handleSetNextPage = () => {
    const newParamsObject = formatSearchParamUrl({
      searchParams,
      params: [{ name: 'page', value: page + 1 }]
    })

    setSearchParams(newParamsObject)
  }

  return (
    <>
      <div
        className={classNames('mx-auto flex max-w-6xl flex-col gap-y-4 py-5', {
          'pointer-events-none opacity-60': isFetchingProductsCart
        })}>
        {productsCartData?.items.length === 0 ? (
          <div className="col-span-full my-10 flex flex-col items-center gap-y-4">
            <img src="/images/loading-image-product.png" alt="" className="aspect-square w-36" />
            <p>Giỏ hàng không có sản phẩm</p>
          </div>
        ) : (
          <>
            {/* Pagination */}
            <div
              className={classNames(
                'flex items-center justify-between border-2 border-secondary px-5 py-4',
                {
                  'animate-pulse': isLoadingProductsCart,
                  'bg-neutral-200': !isLoadingProductsCart
                }
              )}>
              {isLoadingProductsCart ? (
                <>
                  <span className="h-4 basis-1/4 bg-gray-200 text-xl" />
                  <span className="h-4 basis-1/4 bg-gray-200 text-xl" />
                </>
              ) : productsCartData ? (
                <>
                  <span className="text-xl">
                    Có
                    <span className="font-bold text-primary">
                      {` ${productsCartData.totalItems} `}
                    </span>
                    sản phẩm trong giỏ hàng
                  </span>
                  <div className="flex items-center justify-end gap-2 self-stretch">
                    <p className="my-auto flex flex-nowrap px-2">
                      <span className="line-clamp-1 text-primary">
                        {productsCartData.currentPage}
                      </span>
                      <span className="line-clamp-1">/{productsCartData.totalPages}</span>
                    </p>

                    <Button
                      className="h-full bg-white px-3 text-center"
                      disabled={page === 1}
                      onClick={handleSetPrevPage}>
                      <ChevronLeft size={16} />
                    </Button>
                    <Button
                      className="h-full bg-white px-3 text-center"
                      disabled={page === productsCartData.totalPages}
                      onClick={handleSetNextPage}>
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                </>
              ) : null}
            </div>
            <CartTableHeader isLoading={isLoadingProductsCart} />
            <div className="flex flex-col divide-y border border-black/10">{renderCartRow}</div>
            <CartTableFooter />
            <Modal
              onSubmit={() => {
                alert('Oke')
              }}
              isLoading={false}
              setShowModal={setValue}
              heading="Xóa sản phẩm"
              description={`Bạn có muốn xóa sản phẩm ${productSelected} ra khỏi giỏ hàng không ?`}
              buttonText="Xoá"
              value={value}
            />
          </>
        )}
      </div>
    </>
  )
}

export default Cart
