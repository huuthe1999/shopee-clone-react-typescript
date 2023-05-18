import { HTMLAttributes, useRef } from 'react'

import classNames from 'classnames'

import { Button, SkeletonProduct } from '@/components'
import { IProduct } from '@/types'
import { SearchParamsProps } from '@/utils'

import Product from './Product'

interface ProductListProps extends HTMLAttributes<HTMLDivElement> {
  data?: IProduct[]
  onResetParam?: (params?: SearchParamsProps) => void
  hasFilter?: boolean
}

const ProductList = ({ data, className, hasFilter, onResetParam }: ProductListProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const renderData = !data ? (
    Array(15)
      .fill(null)
      .map((_, index) => <SkeletonProduct key={index} />)
  ) : data && data?.length > 0 ? (
    data.map((product) => <Product key={product._id} {...product} />)
  ) : (
    <div className="col-span-full my-10 flex flex-col items-center gap-y-4">
      <img
        src="https://res.cloudinary.com/dknvhah81/image/upload/v1683041957/shoppe-default/a60759ad1dabe909c46a817ecbf71878_pjqggx.png"
        alt=""
        className="aspect-square w-36"
      />
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
    <div ref={ref} className={classNames('mt-2 grid gap-2', [className])}>
      {renderData}
    </div>
  )
}

export default ProductList
