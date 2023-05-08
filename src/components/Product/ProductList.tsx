import { HTMLAttributes, memo, useRef } from 'react'

import classNames from 'classnames'

import { Button } from '@/components/Button'
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

  const renderData = data ? (
    data.map((product) => <Product key={product._id} {...product} />)
  ) : (
    <div className="flex flex-col items-center col-span-full my-10 gap-y-4">
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
          className="uppercase mt-2 mx-auto bg-primary text-white py-3 px-5 rounded-sm text-sm"
          onClick={() => onResetParam?.()}>
          Xóa bộ lọc
        </Button>
      )}
    </div>
  )

  return (
    <div ref={ref} className={classNames('grid gap-2 mt-2', [className])}>
      {renderData}
    </div>
  )
}

export default memo(ProductList)
