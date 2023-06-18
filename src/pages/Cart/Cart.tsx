import { Fragment, Suspense, useCallback, useEffect, useState } from 'react'

import classNames from 'classnames'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import emptyCheckout from '@/assets/images/emptyCheckout.png'
import { Button, Modal, ProductList, Spinner } from '@/components'
import { CART_SIZE, FAV_PRODUCTS_SIZE, PAGE } from '@/constants'
import { useBoolean, useFavProductsQuery, useOrderQuery, useUpdateCartMutation } from '@/hooks'
import { IProductSelected } from '@/types'
import { formatSearchParamUrl } from '@/utils'

import { CartTableFooter, CartTableHeader, CartTableRow, CartTableRowSkeleton } from './components'

const Cart = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [productsSelected, setProductsSelected] = useState<Array<IProductSelected>>([])
  const [productSelected, setProductSelected] = useState<string | undefined>()
  const { value, setValue } = useBoolean()
  const [typeDelete, setTypeDelete] = useState<0 | 1>(0)

  const pageParam = searchParams.get('page')
  const page = pageParam ? +pageParam : PAGE + 1

  const {
    data: productsCartQueryData,
    isLoading: isLoadingProductsCart,
    isFetching: isFetchingProductsCart
  } = useOrderQuery({
    status: -1,
    page: page,
    size: CART_SIZE
  })

  const { data: productFavQueryData, isInitialLoading } = useFavProductsQuery()

  const productFavData = productFavQueryData?.data.data

  const updateCartMutation = useUpdateCartMutation()

  const productsCartData = productsCartQueryData?.data.data

  const productsData = productsCartData?.items.map((product) => ({
    ...product,
    amount: Math.min(product.amount, product.product.quantity),
    isStale: product.amount > product.product.quantity ? true : false
  }))

  const handleDeleteProduct = useCallback(
    (id: string) => {
      setValue(true)
      setProductSelected(id)
      setTypeDelete(0)
    },
    [setValue]
  )

  const handleDeleteMultipleProduct = async () => {
    setValue(true)
    setTypeDelete(1)
  }

  const handleCheckProduct = useCallback(
    (check: boolean, product: IProductSelected) => {
      if (check) {
        const existProductIndex = productsSelected.findIndex(
          (existProduct) => existProduct._id === product._id
        )
        if (existProductIndex !== -1) {
          const newProductsSelected = productsSelected.slice()
          newProductsSelected.splice(existProductIndex, 1, product)
          setProductsSelected(newProductsSelected)
        } else {
          setProductsSelected((prev) => [product, ...prev])
        }
      } else {
        setProductsSelected((prev) =>
          prev.filter((productCartId) => productCartId._id !== product._id)
        )
      }
    },
    [productsSelected]
  )

  const handleSelectAllProduct = useCallback(
    (check: boolean) => {
      if (check) {
        // Xu ly neu mang ton tai phan tu !!!!!!
        setProductsSelected((prevProductsSelected) => {
          // Lọc ra những sản phẩm không có trong danh sách đã thêm vào trước đó

          const restProductsSelected =
            productsData?.filter(
              (productCart) => !prevProductsSelected.some((item) => item._id === productCart._id)
            ) || []
          // Trả về những phần tử đã lưu trước đó + những phần tử mới không trùng lặp
          return prevProductsSelected.concat(
            restProductsSelected.map((productCart) => ({
              ...productCart,
              totalPriceItem:
                (productCart.product.price *
                  (100 - productCart.product.discount) *
                  productCart.amount) /
                100
            }))
          )
        })
      } else {
        // Loại bỏ những phần tử ở trang hiện tại
        setProductsSelected((prevProductsSelected) => {
          return prevProductsSelected.filter(
            (prevProduct) =>
              productsData?.findIndex(
                (productCartData) => productCartData._id === prevProduct._id
              ) === -1
          )
        })
      }
    },
    [productsData]
  )

  const renderCartRow = isLoadingProductsCart
    ? Array(4)
        .fill(null)
        .map((_, index) => <Fragment key={index}>{CartTableRowSkeleton}</Fragment>)
    : productsData?.map((cartProduct) => {
        return (
          <CartTableRow
            key={cartProduct._id}
            voucher={productsSelected.find((product) => product._id === cartProduct._id)?.voucher}
            {...cartProduct}
            isCheck={productsSelected.some((product) => product._id === cartProduct._id)}
            onDeleteProduct={handleDeleteProduct}
            onCheck={handleCheckProduct}
          />
        )
      })

  const isCheck = productsData?.every((productCart) =>
    productsSelected.some((productSelect) => productSelect._id === productCart._id)
  )

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

  // Trường hợp ở trang cuối nhưng không có dữ liệu => navigate về trang trước đó
  useEffect(() => {
    if (productsCartData?.items.length === 0 && productsCartData.hasPrevPage) {
      const handleResetPage = (page: number) => {
        const newParamsObject = formatSearchParamUrl({
          searchParams,
          params: [{ name: 'page', value: page }]
        })

        setSearchParams(newParamsObject)
      }

      handleResetPage(productsCartData.currentPage - 1)
    }
  }, [
    searchParams,
    setSearchParams,
    productsCartData?.currentPage,
    productsCartData?.hasPrevPage,
    productsCartData?.items.length
  ])

  return (
    <>
      <div
        className={classNames('mx-auto flex max-w-6xl flex-col gap-y-4 py-5', {
          'pointer-events-none opacity-60': isFetchingProductsCart
        })}>
        {productsData?.length === 0 ? (
          <div className="col-span-full my-10 flex flex-col items-center gap-y-4">
            <img src={emptyCheckout} alt="empty-order" className="aspect-square max-w-xs" />
            <p className="text-md line-clamp-2 lg:text-xl">Giỏ hàng rỗng</p>
          </div>
        ) : (
          <>
            {/* Pagination */}
            <div
              className={classNames(
                'flex items-center justify-between border-2 border-secondary px-5 py-4',
                {
                  'animate-pulse': isLoadingProductsCart,
                  'bg-white/60': !isLoadingProductsCart
                }
              )}>
              {isLoadingProductsCart ? (
                <>
                  <span className="h-4 basis-1/4 bg-gray-300 text-xl" />
                  <span className="h-4 basis-1/4 bg-gray-300 text-xl" />
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
                      className="h-full border border-neutral-400 bg-white px-3 text-center"
                      disabled={page === 1}
                      onClick={handleSetPrevPage}>
                      <ChevronLeft size={16} />
                    </Button>
                    <Button
                      className="h-full border border-neutral-400 bg-white px-3 text-center"
                      disabled={page === productsCartData.totalPages}
                      onClick={handleSetNextPage}>
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                </>
              ) : null}
            </div>
            <CartTableHeader
              key={page}
              isLoading={isLoadingProductsCart}
              onSelect={handleSelectAllProduct}
              isCheck={isCheck}
            />
            <div className="flex flex-col divide-y border border-black/10">{renderCartRow}</div>
            <CartTableFooter
              isCheck={isCheck}
              isLoading={isLoadingProductsCart}
              productsSelected={productsSelected}
              quantity={productsData?.length}
              onSelect={handleSelectAllProduct}
              onMultipleDelete={handleDeleteMultipleProduct}
            />

            {/* May like product */}
            <Suspense fallback={<Spinner />}>
              <div className="py-6">
                <h1 className="py-4 text-xl uppercase">CÓ THỂ BẠN CŨNG THÍCH</h1>
                <ProductList
                  skeletonSize={FAV_PRODUCTS_SIZE}
                  isFetching={isInitialLoading}
                  data={productFavData?.items}
                  className="grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6"
                />
              </div>
            </Suspense>
            <Modal
              onSubmit={async () => {
                if (typeDelete === 0) {
                  const productId = productSelected as string
                  updateCartMutation.mutate(
                    { orderIds: [productId], actionType: 1 },
                    {
                      onSuccess(data) {
                        toast.success(data.data.message)

                        const existProductIndex = productsSelected.findIndex(
                          (existProduct) => existProduct._id === productId
                        )
                        if (existProductIndex !== -1) {
                          const newProductsSelected = productsSelected.slice()
                          newProductsSelected.splice(existProductIndex, 1)
                          setProductsSelected(newProductsSelected)
                        }
                      },
                      onError(error) {
                        toast.error(error.response?.data.message)
                      },
                      onSettled() {
                        setValue(false)
                      }
                    }
                  )
                } else {
                  updateCartMutation.mutate(
                    { orderIds: productsSelected.map((item) => item._id), actionType: 1 },
                    {
                      onSuccess(data) {
                        toast.success(data.data.message)
                        setProductsSelected([])
                      },
                      onError(error) {
                        toast.error(error.response?.data.message)
                      },
                      onSettled() {
                        setValue(false)
                      }
                    }
                  )
                }
              }}
              isLoading={updateCartMutation.isLoading}
              setShowModal={setValue}
              confirmText="Xoá"
              cancelText="Hủy"
              open={value}>
              {/* Start content */}
              <div className="sm:flex sm:items-start">
                {/* Start Icon */}
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
                {/* End Icon */}
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">Xóa sản phẩm</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Bạn có muốn xóa {typeDelete === 1 && ' những '}sản phẩm đã chọn ra khỏi giỏ
                      hàng ?
                    </p>
                  </div>
                </div>
              </div>
              {/* End content */}
            </Modal>
          </>
        )}
      </div>
    </>
  )
}

export default Cart
