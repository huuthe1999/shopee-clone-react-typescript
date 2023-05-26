import { HTMLAttributes, useRef } from 'react'

import classNames from 'classnames'

import { Button, SkeletonProduct } from '@/components'
import { IProduct } from '@/types'
import { SearchParamsProps } from '@/utils'

import Product from './Product'

interface ProductListProps extends HTMLAttributes<HTMLDivElement> {
  skeletonSize?: number
  isFetching?: boolean
  data?: IProduct[]
  onResetParam?: (params?: SearchParamsProps) => void
  hasFilter?: boolean
}

const ProductList = ({
  skeletonSize = 15,
  isFetching,
  data,
  className,
  hasFilter,
  onResetParam
}: ProductListProps) => {
  const ref = useRef<HTMLDivElement>(null)

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
    <div ref={ref} className={classNames('mt-2 grid place-items-center gap-2', [className])}>
      {renderData}
    </div>
  )
}

export default ProductList
