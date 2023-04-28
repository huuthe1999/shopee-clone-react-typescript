import classNames from 'classnames'

import Product from './Product'

interface Props {
  header?: React.ReactNode
  sortBar?: React.ReactNode
  listClassName?: string
}

const ProductList = ({ header, listClassName, sortBar }: Props) => {
  return (
    <>
      {/* Sort bar */}
      {sortBar}

      {/* Header */}
      {header}
      {/* List */}
      <div className={classNames('grid gap-2 mt-2', [listClassName])}>
        {[...new Array(48)].map((product, index) => (
          <Product key={index} index={index} />
        ))}
      </div>
    </>
  )
}

export default ProductList
