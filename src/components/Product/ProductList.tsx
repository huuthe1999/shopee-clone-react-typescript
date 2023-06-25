import { HTMLAttributes } from 'react'

import classNames from 'classnames'
import { AnimatePresence } from 'framer-motion'

import { Button, SkeletonProduct } from '@/components'
import { PRODUCTS_SIZE } from '@/constants'
import { IProduct } from '@/types'
import { SearchParamsProps } from '@/utils'

import Product from './Product'

interface ProductListProps extends HTMLAttributes<HTMLDivElement> {
  skeletonSize?: number
  isFetching?: boolean
  data?: Omit<IProduct, 'images'>[]
  onResetParam?: (params?: SearchParamsProps) => void
  hasFilter?: boolean
}

const ProductList = ({
  skeletonSize = PRODUCTS_SIZE,
  isFetching,
  data,
  className,
  hasFilter,
  onResetParam
}: ProductListProps) => {
  // const renderData = isFetching ? (
  //   Array(skeletonSize)
  //     .fill(null)
  //     .map((_, index) => <SkeletonProduct key={index} />)
  // ) : data && data?.length > 0 ? (
  //   data.map((product) => <Product key={product._id} {...product} />)
  // ) : (
  //   <div className="col-span-full my-10 flex flex-col items-center gap-y-4">
  //     <img src="/images/loading-image-product.png" alt="" className="aspect-square w-36" />
  //     <p>
  //       {hasFilter
  //         ? 'Hix. Không có sản phẩm nào. Bạn thử tắt điều kiện lọc và tìm lại nhé?'
  //         : 'Danh mục không có sản phẩm'}
  //     </p>
  //     {hasFilter && (
  //       <Button
  //         className="mx-auto mt-2 rounded-sm bg-primary px-5 py-3 text-sm uppercase text-white"
  //         onClick={() => onResetParam?.()}>
  //         Xóa bộ lọc
  //       </Button>
  //     )}
  //   </div>
  // )

  const renderData = isFetching ? (
    Array(skeletonSize)
      .fill(null)
      .map((_, index) => <SkeletonProduct key={index} />)
  ) : data && data?.length > 0 ? (
    data.map((product) => <Product key={product._id} {...product} />)
  ) : (
    <div className="col-span-full my-10 flex flex-col items-center gap-y-4">
      <img src="/images/loading-image-product.png" alt="" className="aspect-square w-36" />
      <p>
        {hasFilter
          ? 'Hix. Không có sản phẩm nào. Bạn thử tắt điều kiện lọc và tìm lại nhé?'
          : 'Danh mục không có sản phẩm'}
      </p>
      {hasFilter && (
        <Button
          className="mx-auto mt-2 rounded-sm bg-primary px-5 py-3 text-sm uppercase text-white"
          onClick={() => onResetParam?.()}>
          Xóa bộ lọc
        </Button>
      )}
    </div>
  )

  return (
    <div className={classNames('mt-2 grid place-items-center gap-2', [className])}>
      <AnimatePresence initial={false}>
        {data && data?.length === 0 && (
          <div className="col-span-full my-10 flex flex-col items-center gap-y-4">
            <img src="/images/loading-image-product.png" alt="" className="aspect-square w-36" />
            <p>
              {hasFilter
                ? 'Hix. Không có sản phẩm nào. Bạn thử tắt điều kiện lọc và tìm lại nhé?'
                : 'Danh mục không có sản phẩm'}
            </p>
            {hasFilter && (
              <Button
                className="mx-auto mt-2 rounded-sm bg-primary px-5 py-3 text-sm uppercase text-white"
                onClick={() => onResetParam?.()}>
                Xóa bộ lọc
              </Button>
            )}
          </div>
        )}
        {data &&
          data?.length > 0 &&
          data.map((product) => <Product key={product._id} {...product} />)}
        {isFetching &&
          Array(skeletonSize)
            .fill(null)
            .map((_, index) => <SkeletonProduct key={index} />)}
      </AnimatePresence>
    </div>
  )
}

export default ProductList
