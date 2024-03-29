import { Suspense, lazy } from 'react'

import { Rating, Star } from '@smastrom/react-rating'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import DOMPurify from 'dompurify'
import { Helmet } from 'react-helmet-async'
import { Navigate, useLocation, useParams } from 'react-router-dom'

import { BreadCrumb, BreadCrumbItem, Spinner } from '@/components'
import { FAV_PRODUCTS_SIZE, PATHS, QUERY_KEYS } from '@/constants'
import { useFavProductsQuery } from '@/hooks'
import { ProductPurchase } from '@/pages/ProductDetail/components/ProductPurchase'
import { productServices } from '@/services'
import { checkIfValidId, formatCurrency, formatNumber, splittingId } from '@/utils'

import { ProductCarousel } from './components'

const ProductList = lazy(() => import('@/components/Product/ProductList'))

const ProductDetail = () => {
  const { productSlug } = useParams()
  const { pathname } = useLocation()
  const productId = splittingId(productSlug) as string
  const { data: productQueryData, isFetching: isFetchingProductQueryData } = useQuery({
    queryKey: [QUERY_KEYS.product.detail, productId],
    queryFn: () => productServices.getProduct(productId),
    enabled: checkIfValidId(productId)
  })

  const productData = productQueryData?.data.data

  const { data: productFavQueryData, isInitialLoading } = useFavProductsQuery(
    checkIfValidId(productId)
  )

  const productFavData = productFavQueryData?.data.data

  const breadCrumb: BreadCrumbItem[] | null = productData
    ? [
        {
          path: PATHS.HOME_PATH,
          name: 'Shopee'
        },
        {
          path: `/${productData?.category.slug}-${productData.category._id}`,
          name: productData?.category.name
        },
        {
          path: {
            pathname: `/${productData?.category.slug}-${productData.category._id}`,
            search: `?facet=${productData.subCategory._id}`
          },
          name: productData.subCategory.name
        },
        {
          name: productData.name
        }
      ]
    : null

  if (!checkIfValidId(productId)) {
    return <Navigate to={PATHS.NOT_FOUND_PATH} replace />
  }

  return (
    <>
      <Helmet>
        <title>{productData?.name}</title>
        <meta
          name="description"
          content={
            productData?.name +
            '. Mua hàng qua mạng uy tín, tiện lợi. Shopee đảm bảo nhận hàng, hoặc được hoàn lại tiền Giao Hàng Miễn Phí. XEM NGAY!'
          }
          data-react-helmet="true"
        />
        <link rel="canonical" href={pathname} data-react-helmet="true" />
      </Helmet>
      <div
        className={classNames('mx-auto flex max-w-6xl flex-col', {
          'pointer-events-none opacity-50': isFetchingProductQueryData
        })}>
        {/* Breadcrumb */}
        <div className="mt-4 p-2">
          <BreadCrumb data={breadCrumb} isLoading={isFetchingProductQueryData} />
        </div>
        {/* Content */}

        <div className="mt-2 grid grid-cols-12 bg-white p-2 sm:mt-6 sm:gap-x-8 sm:gap-y-4 sm:p-4">
          <div className="col-span-12 md:col-span-5">
            {isFetchingProductQueryData ? (
              <div
                className={classNames('relative w-full animate-pulse overflow-hidden pt-[100%]')}>
                <img
                  src={'/images/loading-image-product.png'}
                  alt={'default_image'}
                  className="absolute left-0 top-0 h-full w-full object-cover"
                />
              </div>
            ) : (
              productData && <ProductCarousel images={productData.images} />
            )}
          </div>

          {isFetchingProductQueryData ? (
            <div className="col-span-12 flex animate-pulse flex-col gap-y-6 p-2 md:col-span-7">
              <p className="h-12 w-full rounded-sm bg-gray-200" />
              <p className="h-4 w-full rounded-sm bg-gray-200" />
              <p className="h-6 w-full rounded-sm bg-gray-200" />
              <p className="h-12 w-full rounded-sm bg-gray-200" />
              <p className="h-4 w-full rounded-sm bg-gray-200" />
              <p className="h-6 w-full rounded-sm bg-gray-200" />
            </div>
          ) : productData ? (
            <div className="col-span-12 flex flex-col gap-y-6 p-2 md:col-span-7">
              <h1 className="text-md gap-x-2 capitalize sm:text-xl">
                {productData.shopType !== 0 && (
                  <span
                    className={classNames(
                      'relative float-left mr-1 translate-y-1 rounded px-2.5 py-0.5 text-xs font-medium text-white',
                      {
                        'bg-red-700': productData.shopType === 1,
                        'bg-primary': productData.shopType === 2
                      }
                    )}>
                    {productData.shopType === 1 ? 'Mall' : 'Yêu thích'}
                  </span>
                )}

                {productData.name}
              </h1>
              <div className="flex divide-x divide-slate-400">
                <div
                  className={classNames('flex items-center gap-x-1 px-4 pl-0', {
                    'text-primary': productData.shopType !== 1,
                    'text-red-700': productData.shopType === 1
                  })}>
                  <span className="underline underline-offset-4">
                    {productData.rating.toFixed(1)}
                  </span>
                  <Rating
                    readOnly
                    value={productData.rating}
                    itemStyles={{
                      activeFillColor: 'currentColor',
                      activeStrokeColor: 'currentColor',
                      itemStrokeWidth: 2,
                      itemShapes: Star
                    }}
                    style={{ maxWidth: 80 }}
                  />
                </div>

                <div className="flex items-center gap-x-1 px-4">
                  <span className="underline underline-offset-4">
                    {formatNumber(productData.sold)}
                  </span>
                  <span className="text-neutral-500">Đã Bán</span>
                </div>
              </div>
              {/* Price */}
              <div className="flex flex-nowrap items-center gap-x-3 bg-neutral-100 p-4">
                {productData.discount > 0 && (
                  <span className={classNames('text-md text-neutral-500 line-through')}>
                    {formatCurrency(productData.price)}
                  </span>
                )}
                <h2
                  className={classNames('text-3xl', {
                    'text-primary': productData.shopType !== 1,
                    'text-red-700': productData.shopType === 1
                  })}>
                  {formatCurrency((productData.price * (100 - productData.discount)) / 100)}
                </h2>
                {productData.discount > 0 && (
                  <span
                    className={classNames(
                      'mr-1 shrink-0 rounded px-2.5 py-0.5 text-xs font-medium text-white',
                      {
                        'bg-red-700': productData.shopType === 1,
                        'bg-primary': productData.shopType !== 1
                      }
                    )}>
                    {productData.discount}% GIẢM
                  </span>
                )}
              </div>
              {/* Vouchers */}
              {productData.vouchers.length > 0 && (
                <div className="flex items-center gap-x-4 text-sm max-sm:justify-between">
                  <span className="shrink-0 text-neutral-500 sm:max-w-[6.875rem]">
                    Mã Giảm Giá Của Shop
                  </span>
                  {productData.vouchers.map((voucher) => {
                    return (
                      <span
                        key={voucher._id}
                        className={classNames(
                          'wave mr-1 block rounded px-2.5 py-0.5 text-sm font-medium capitalize',
                          {
                            'bg-red-100 text-red-700': productData.shopType === 1,
                            'bg-primary text-white': productData.shopType !== 1
                          }
                        )}>
                        Giảm{' '}
                        {voucher.type === 0
                          ? voucher.discount.percent + ' %'
                          : formatCurrency(voucher.discount.price)}
                      </span>
                    )
                  })}
                </div>
              )}
              {/* Add to cart & Buy now */}
              <ProductPurchase
                key={productData._id}
                shopType={productData.shopType}
                quantity={productData.quantity}
                productId={productData._id}
                isOutOfStock={!productData.isActive || !productData.quantity}
              />
            </div>
          ) : (
            <div className="col-span-full my-10 flex flex-col items-center gap-y-4">
              <img src="/images/loading-image-product.png" alt="" className="aspect-square w-36" />
              <p>Sản phẩm không tồn tại</p>
            </div>
          )}
        </div>

        {/* Description */}
        {isFetchingProductQueryData ? (
          <div className="flex animate-pulse flex-col gap-y-4 bg-white px-5 py-2">
            <p className="h-12 w-full rounded-sm bg-gray-200" />
            <p className="h-6 w-2/3 rounded-sm bg-gray-200" />
            <p className="h-6 w-2/3 rounded-sm bg-gray-200" />
            <p className="h-6 w-2/3 rounded-sm bg-gray-200" />
            <p className="h-6 w-2/3 rounded-sm bg-gray-200" />
          </div>
        ) : productData && productData.description ? (
          <div className="bg-white p-3 sm:p-6">
            <h2 className="bg-neutral-100 p-4 text-xl uppercase">MÔ TẢ SẢN PHẨM</h2>
            <p
              className="mt-4 whitespace-pre-wrap break-words leading-loose text-black/[0.8] sm:mt-8"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(productData.description)
              }}
            />
          </div>
        ) : null}

        {/* May like product */}
        <Suspense fallback={<Spinner />}>
          <div className="p-2 sm:p-6">
            <h2 className="py-4 text-xl uppercase">CÓ THỂ BẠN CŨNG THÍCH</h2>
            <ProductList
              skeletonSize={FAV_PRODUCTS_SIZE}
              isFetching={isInitialLoading}
              data={productFavData?.items}
              className="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
            />
          </div>
        </Suspense>
      </div>
    </>
  )
}

export default ProductDetail
