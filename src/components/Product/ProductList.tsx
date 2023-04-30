import { HTMLAttributes } from 'react'

import classNames from 'classnames'

import Product from './Product'

interface Props extends HTMLAttributes<HTMLDivElement> {}

const ProductList = ({ className }: Props) => {
  return (
    <div className={classNames('grid gap-2 mt-2', [className])}>
      {[...new Array(48)].map((product, index) => (
        <Product key={index} index={index} />
      ))}
    </div>
  )
}

export default ProductList
