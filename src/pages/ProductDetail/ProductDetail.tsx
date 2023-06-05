import { Suspense, lazy } from 'react'

import { Rating, Star } from '@smastrom/react-rating'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import DOMPurify from 'dompurify'
import { useParams } from 'react-router-dom'

import { BreadCrumb, BreadCrumbItem, Spinner } from '@/components'
import { FAV_PRODUCTS_SIZE, PATHS } from '@/constants'
import { useFavProductsQuery } from '@/hooks'
import { ProductPurchase } from '@/pages/ProductDetail/components/ProductPurchase'
import { productServices } from '@/services'
import { formatCurrency, formatNumber } from '@/utils'

import { ProductCarousel } from './components'

const ProductList = lazy(() => import('@/components/Product/ProductList'))

const ProductDetail = () => {
  let { productSlug } = useParams()

  productSlug = productSlug as string
  const productId = productSlug.substring(productSlug.lastIndexOf('-') + 1)

  const { data: productQueryData, isFetching: isFetchingProductQueryData } = useQuery({
    queryKey: [PATHS.PRODUCT_DETAIL_PATH, productId],
    queryFn: () => productServices.getProduct(productId),
    staleTime: 2 * 60 * 1000,
    keepPreviousData: true
  })

  const productData = productQueryData?.data.data

  const { data: productFavQueryData, isInitialLoading } = useFavProductsQuery()

  const productFavData = productFavQueryData?.data.data

  const breadCrumb: BreadCrumbItem[] | null = productData
    ? [
        {
          path: PATHS.HOME_PATH,
          name: 'Shopee'
        },
        {
          path: `/${productData?.category.slug}`,
          name: productData?.category.name
        },
        {
          path: {
            pathname: `/${productData?.category.slug}`,
            search: `?facet=${productData.subCategory._id}`
          },
          name: productData.subCategory.name
        },
        {
          name: productData.name
        }
      ]
    : null

  return (
    <>
      <div
        className={classNames('mx-auto flex max-w-6xl flex-col', {
          'pointer-events-none opacity-50': isFetchingProductQueryData
        })}>
        {/* Breadcrumb */}
        <div className="mt-4">
          <BreadCrumb data={breadCrumb} isLoading={isFetchingProductQueryData} />
        </div>
        {/* Content */}

        <div className="mt-6 grid grid-cols-12 gap-x-8 gap-y-4 bg-white p-4">
          <div className="col-span-12 md:col-span-5">
            <ProductCarousel
              images={productData?.images}
              key={productData?.name}
              isLoading={isFetchingProductQueryData}
            />
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
              <h1 className="gap-x-2 text-xl capitalize">
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
                      'mr-1 rounded px-2.5 py-0.5 text-xs font-medium text-white',
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
                <div className="flex items-center gap-x-4 text-sm">
                  <span className="max-w-[6.875rem] text-neutral-500">Mã Giảm Giá Của Shop</span>
                  {productData.vouchers.map((voucher) => {
                    return (
                      <span
                        key={voucher._id}
                        className={classNames(
                          'wave mr-1 block rounded px-2.5 py-0.5 text-sm font-medium uppercase',
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
          <div className="bg-white p-6">
            <h1 className="bg-neutral-100 p-4 text-xl uppercase">MÔ TẢ SẢN PHẨM</h1>
            <p
              className="mt-8 whitespace-pre-wrap leading-loose text-black/[0.8]"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(productData.description)
              }}
            />
          </div>
        ) : null}

        {/* May like product */}
        <Suspense fallback={<Spinner />}>
          <div className="p-6">
            <h1 className="py-4 text-xl uppercase">CÓ THỂ BẠN CŨNG THÍCH</h1>
            <ProductList
              skeletonSize={FAV_PRODUCTS_SIZE}
              isFetching={isInitialLoading}
              data={productFavData?.items}
              className="grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6"
            />
          </div>
        </Suspense>
      </div>
    </>
  )
}

export default ProductDetail
