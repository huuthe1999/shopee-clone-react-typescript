import { Suspense, lazy } from 'react'

import { Rating, Star } from '@smastrom/react-rating'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import DOMPurify from 'dompurify'
import { Truck } from 'react-feather'
import { useParams } from 'react-router-dom'

import { BreadCrumb, BreadCrumbItem, Spinner } from '@/components'
import { PATHS } from '@/constants'
import { useProductsQuery } from '@/hooks'
import { ProductPurchase } from '@/pages/ProductDetail/components/ProductPurchase'
import { productServices } from '@/services'
import { SortByType } from '@/types'
import { formatCurrency, formatNumber } from '@/utils'

import { ProductCarousel } from './components'

const ProductList = lazy(() => import('@/components/Product/ProductList'))
interface Props {}

const ProductDetail = (props: Props) => {
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

  const { data: productFavQueryData, isInitialLoading } = useProductsQuery({
    size: 18,
    page: 0,
    sortBy: 'popular' as SortByType,
    facet: productData?.subCategory._id,
    categorySlug: productData?.category.slug,
    enabled: Boolean(productData)
  })

  const productFavData = productFavQueryData?.data.data

  const breadCrumb: BreadCrumbItem[] | undefined = productData
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
    : undefined

  return (
    <>
      <div
        className={classNames('mx-auto flex max-w-6xl flex-col', {
          'pointer-events-none opacity-50': isFetchingProductQueryData
        })}>
        {/* Breadcrumb */}
        <div className="mt-4">
          <BreadCrumb data={breadCrumb} />
        </div>
        {/* Content */}

        <div className="mt-6 grid grid-cols-12 gap-x-8 gap-y-4 bg-white p-4">
          <div className="col-span-12 md:col-span-5">
            <ProductCarousel images={productData?.images} key={productData?.name} />
          </div>
          {productData ? (
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
              <div className="flex items-center gap-x-4 text-sm">
                <span className="max-w-[6.875rem] text-neutral-500">Mã Giảm Giá Của Shop</span>
                <span
                  className={classNames(
                    'wave mr-1 block rounded px-2.5 py-0.5 text-sm font-medium uppercase',
                    {
                      'bg-red-100 text-red-700': productData.shopType === 1,
                      'bg-primary text-white': productData.shopType !== 1
                    }
                  )}>
                  Giảm ₫35k
                </span>
                <span
                  className={classNames(
                    'wave mr-1 block rounded px-2.5 py-0.5 text-sm font-medium uppercase',
                    {
                      'bg-red-100 text-red-700': productData.shopType === 1,
                      'bg-primary text-white': productData.shopType !== 1
                    }
                  )}>
                  Giảm ₫35k
                </span>
              </div>
              {/* Insurance */}
              <div className="flex items-center gap-x-4 text-sm">
                <span className="min-w-[6.875rem] text-neutral-500">Bảo Hiểm</span>
                <p>
                  Bảo hiểm Thời trang
                  <span className="ml-2 inline-block rounded-t-md rounded-br-md bg-primary px-2 text-xs text-white">
                    Mới
                  </span>
                </p>
              </div>
              {/* Shipping */}
              <div className="flex gap-x-4 text-sm">
                <span className="min-w-[6.875rem] text-neutral-500">Vận Chuyển</span>
                <div className="grid flex-1 grid-cols-[auto,1fr] gap-2">
                  <img
                    src="/images/shipping-icon.png"
                    alt="shipping-icon"
                    className="col-start-1 h-5 max-w-full"
                  />
                  <p className="col-start-2">Miễn phí vận chuyển</p>
                  <Truck className="col-start-1 h-5 max-w-full" />
                  <div className="col-start-2 flex gap-x-4">
                    <span className="min-w-[6.875rem] text-neutral-500">Phí Vận Chuyển</span>
                    <span>
                      {formatCurrency(0)} - {formatCurrency(22000)}
                    </span>
                  </div>
                </div>
              </div>
              {/* Add to cart & Buy now */}
              <ProductPurchase
                key={productData._id}
                {...productData}
                productId={productData._id}
                image={productData.images[0].url}
                categorySlug={productData.category.slug}
                productSlug={productData.slug}
              />
            </div>
          ) : (
            <div className="col-span-7 flex animate-pulse flex-col gap-y-6 p-2">
              <p className="h-12 w-full rounded-sm bg-gray-200" />
              <p className="h-4 w-full rounded-sm bg-gray-200" />
              <p className="h-6 w-full rounded-sm bg-gray-200" />
              <p className="h-12 w-full rounded-sm bg-gray-200" />
              <p className="h-4 w-full rounded-sm bg-gray-200" />
              <p className="h-6 w-full rounded-sm bg-gray-200" />
            </div>
          )}
        </div>

        {/* Description */}
        <div className="bg-white p-6">
          <h1 className="bg-neutral-100 p-4 text-xl uppercase">MÔ TẢ SẢN PHẨM</h1>
          <p
            className="mt-8 whitespace-pre-wrap leading-loose text-black/[0.8]"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                'Quần Jogger Nam KAKI CAO CẤP Quần Kaki Nam ống bo chun Kiểu Dáng Hàn trẻ trung Mã JK11\n👉CAM KẾT CỦA SHOP - Shop cam kết không bán hàng giả, hàng nhái, chất lượng luôn là hàng đầu để shop có thể phát triển thương hiệu và vươn xa. \n- Sản phẩm cam kết như hình thật 100% - Tư vấn nhiệt tình, chu đáo luôn lắng nghe khách hàng để phục vụ tốt. \n- Giao hàng nhanh đúng tiến độ không phải để quý khách chờ đợi lâu để nhận hàng. \n- Hàng được kiểm tra kĩ càng, cẩn thận và tư vấn nhiệt tình trước khi gói hàng giao cho Quý Khách \n- Hàng có sẵn, giao hàng ngay khi nhận được đơn \n- Hoàn tiền nếu sản phẩm không giống với mô tả. Chấp nhận đổi hàng khi size không vừa -\n Giao hàng trên toàn quốc, nhận hàng trả tiền - Hỗ trợ đổi trả theo quy định của Shopee \n👉 ĐỊA CHỈ SHOP - , Linh Trung, TP. Thủ Đức'
              )
            }}
          />
        </div>

        {/* May like product */}
        <Suspense fallback={<Spinner />}>
          <div className="p-6">
            <h1 className="py-4 text-xl uppercase">CÓ THỂ BẠN CŨNG THÍCH</h1>
            <ProductList
              skeletonSize={10}
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
